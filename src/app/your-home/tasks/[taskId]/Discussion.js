import React, {useEffect, useState} from 'react'
import { useParams } from 'next/navigation';
import { API_BASE_URL } from '@/app/api/apiBase';
import Cookies from 'js-cookie';
import { getDiscussions, getMemberTaskList, getTaskDetails } from '@/app/api/taskAPI';
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
import { format, addHours  } from 'date-fns';

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
    const [discussions, setDiscussions] = useState(null);
    const [comments, setComments] = useState(null);

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
        getDiscussions(id)
            .then((responseData) => {
                setDiscussions(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
        getManagerIdList(projectId)
            .then((responseData) => {
                setManagerIds(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
        localStorage.setItem('taskId', id)
    }, [discussions]);

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

    const handlePostComment = async (e) => {
        const postData = {
            "rootId": id,
            "email": Cookies.get('user'),
            "content": comments,
        }
        console.log(postData)

        try {
            const response = await fetch(`${API_BASE_URL}/api/discussions/task`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    postData
                ),
            });

            if (response.ok) {
                // Xử lý phản hồi từ server nếu đăng nhập thành công
                const data = await response.json();
                console.log('Post successful!', data);
                setComments("")
                // alert('Comments successfully!!!')
                // window.location.reload();
            } else {
                // Xử lý phản hồi từ server nếu đăng nhập không thành công
                console.log('Post failed!');
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Phần Discussions */}
            <div className="col-span-2 bg-gray-100 rounded-lg p-4 h-auto">
                {memberIds && memberIds.includes(userId) || (managerIds && managerIds.includes(userId)) ? (
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Your comment"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg mr-2"
                        />
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            onClick={handlePostComment}
                        >
                            Add Comment
                        </button>
                    </div>
                ) : (
                    <></>
                )}
                <div className="flex-grow overflow-y-scroll">
                    {discussions ? (
                        discussions
                        .sort((a, b) => new Date(b.time) - new Date(a.time))
                        .map((discussion) => (
                            <div key={discussion.discussionId} className="bg-white p-2 rounded-lg mb-2">
                                <p className="text-blue-500 font-semibold">{discussion.email}</p>
                                <p className="text-gray-500 text-sm">
                                    {format(new Date(discussion.time), "dd/MM/yyyy HH:mm:ss")}
                                </p>
                                <p>{discussion.content}</p>
                            </div>
                        ))
                    ) : (
                        <h2>Loading!!</h2>
                    )}
                </div>
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
                                <div key={document.docId}>
                                    <li className="mt-2">
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
                                </div>
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