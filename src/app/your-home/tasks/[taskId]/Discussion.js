import React, {useEffect, useState} from 'react'
import { useParams } from 'next/navigation';
import { API_BASE_URL } from '@/app/api/apiBase';
import Cookies from 'js-cookie';
import { getMemberTaskList, getTaskDetails } from '@/app/api/taskAPI';
import { getManagerIdList } from '@/app/api/projectAPI';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { getOneDocument, getDocuments } from '@/app/api/taskAPI';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const Discussion = () => {
    const params = useParams();
    const id = params.taskId;
    const userId = Cookies.get('userId');
    const projectId = localStorage.getItem('projectId');
    const [data, setData] = useState(null);
    const [documents, setDocuments] = useState(null);
    const [selectedDocuments, setSelectedDocuments] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [members, setMembers] = useState(null);
    const [managerIds, setManagerIds] = useState(null);
    const [memberIds, setMemberIds] = useState(null);

    useEffect(() => {
        // Gọi hàm fetchUserData từ module api.js
        getTaskDetails(id)
            .then((responseData) => {
                setData(responseData); // Cập nhật dữ liệu vào state data
                setMemberIds(responseData.memberIds)
                console.log(responseData);
            });

        getMemberTaskList(id)
            .then((responseData) => {
                setMembers(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
        getDocuments(id)
            .then((responseData) => {
                setDocuments(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
        getManagerIdList(projectId)
            .then((responseData) => {
                setManagerIds(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });  
        localStorage.setItem('taskId', id)
    }, []);

    const handleOpenDialog = (docId) => {
        setSelectedDocuments(docId);
    };
    const handleCloseDialog = () => {
        setSelectedDocuments(null);
    };

    const handleDelete = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/tasks/documents/delete/${selectedDocuments}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                }
            });
            
            console.log('Delete successful!');
            setSelectedDocuments(null);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDownload = async (docId, docName) => {
        try {
            // Gọi hàm getOneDocument từ API để nhận dữ liệu byte[]
            const blob = await getOneDocument(docId);

            if (blob) {
                // Tạo URL cho Blob để tạo đường dẫn tải về
                const url = URL.createObjectURL(blob);

                // Tạo một thẻ a ẩn và sử dụng nó để trigger download
                const a = document.createElement('a');
                a.href = url;
                a.download = `${docName}.docx`;
        
                // Thêm thẻ a vào DOM và kích hoạt click tự động
                document.body.appendChild(a);
                a.click();
        
                // Xóa đối tượng URL sau khi download hoàn tất
                URL.revokeObjectURL(url);
            } else {
                console.error('Error getting document data');
            }
            } catch (error) {
                console.error('Error handling download:', error);
            }
    };

    const handleCreateDocument = async () => {
        try {
            if (!selectedFile) {
                console.error('No file selected.');
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedFile);
            console.log(selectedFile);
            console.log(formData);
        
            const response = await fetch(`${API_BASE_URL}/api/documents/task?taskId=${localStorage.getItem('taskId')}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                },
                body: formData,
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error uploading document:', errorData.message);
                return;
            }
        
            console.log('Document uploaded successfully.');
        

            setSelectedFile(null);
            window.location.reload();

        
            } catch (error) {
            console.error('Error handling upload:', error);
            }
    };

    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Phần Details Info */}
            <div className="col-span-2 border-r-2 bg-gray-100 rounded-lg p-4">
                <strong className="text-xl font-semibold">Details Information:</strong>
                <br />
                <>
                    <div className='flex'>
                            <>
                                <div className="mr-12 mt-2">
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Task Name:</strong> 
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Description:</strong> 
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Priority:  </strong>
                                        <span className={`text-lg font-semibold`}>
                                        
                                        </span>
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Progress:  </strong>
                                        <span className={`text-lg font-semibold`}>
                                            
                                        </span>
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Start Date:</strong> 
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>End Date:</strong> 
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Create By:</strong>
                                    </div>
                                </div>
                            </>
                        </div>
                    </>
            </div>
            <div>
                <div className="col-span-1 flex items-center ">
                        <strong className="text-xl font-semibold">Documents:</strong>
                        { memberIds && memberIds.includes(userId) || (managerIds && managerIds.includes(userId)) ? (
                            <>
                                <label className="ml-auto mr-4 flex items-center cursor-pointer">
                                    <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                    />
                                    <span className="text-blue-500 hover:text-blue-700">
                                    <PostAddIcon fontSize="large" />
                                    </span>
                                </label>
                                <button
                                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:ring"
                                    onClick={handleCreateDocument}
                                >
                                    Upload
                                </button>
                            </>
                        ) : (
                            <p></p>
                        )}
                    </div>
                    {documents ? (
                        <>
                            <ul className="list-disc pl-6">
                            {documents.map((document) => (
                                <li key={document.docId} className="mt-2">
                                    {/* Các thông tin tài liệu */}
                                    <a
                                        onClick={() => handleDownload(document.docId, document.name)}
                                        className="text-blue-500 hover:cursor-pointer"
                                    >
                                        <SaveAltIcon style={{ fontSize: 30, marginRight: 4 }} />
                                        {document.name}
                                    </a>
                                    { memberIds && memberIds.includes(userId) || (managerIds && managerIds.includes(userId)) ? (
                                        <IconButton
                                            onClick={() => handleOpenDialog(document.docId)}
                                            id={`delete-${document.docId}`}
                                            aria-label="delete"
                                            style={{ fontSize: '1.5rem', marginLeft: '10px' }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    ) : (
                                        <p></p>
                                    )}
                                </li>
                            ))}
                            </ul>
                        </>
                        ) : (
                        <h2>No documents available.</h2>
                    )}

            </div>
            <Dialog
                open={selectedDocuments !== null}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Note"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to delete this document?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog}>No</Button>
                <Button onClick={handleDelete} autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Discussion