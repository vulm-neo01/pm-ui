import React, {useEffect, useState} from 'react'
import { useParams } from 'next/navigation';
import { getProjectDetails, getDocuments, getOneDocument, getManagerIdList } from '@/app/api/projectAPI';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { API_BASE_URL } from '@/app/api/apiBase';
import Cookies from 'js-cookie';
import PostAddIcon from '@mui/icons-material/PostAdd';


const ProjectDetail = () => {
    const params = useParams();
    const id = params.projectId;
    const userId = Cookies.get('userId');
    const [data, setData] = useState(null);
    const [documents, setDocuments] = useState(null);
    const [selectedDocuments, setSelectedDocuments] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    const [projectName, setProjectName] = useState(data ? data.projectName : 'New Project Name');
    const [description, setDescription] = useState(data ? data.description : 'New Description');
    const [progress, setProgress] = useState(data ? data.progress : 'READY');
    const [startDate, setStartDate] = useState(data ? data.startDate : '');
    const [endDate, setEndDate] = useState(data ? data.endDate : '');

    const [managers, setManagers] = useState(null);

    const handleOpenDialog = (docId) => {
        setSelectedDocuments(docId);
    };
    const handleCloseDialog = () => {
        setSelectedDocuments(null);
    };
    useEffect(() => {
        // Gọi hàm fetchUserData từ module api.js
        getProjectDetails(id)
            .then((responseData) => {
                setData(responseData); // Cập nhật dữ liệu vào state data
                setProjectName(responseData.projectName)
                setDescription(responseData.description)
                setProgress(responseData.progress)
                setStartDate(responseData.startDate)
                setEndDate(responseData.endDate)
                console.log(responseData);
            });
        getDocuments(id)
            .then((responseData) => {
                setDocuments(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
        getManagerIdList(id)
            .then((responseData) => {
                setManagers(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });  
        localStorage.setItem('projectId', id)
    }, []);

    const getProgressClass = (progress) => {
        switch (progress) {
            case 'READY':
                return 'text-blue-500'; // Màu xanh cho giá trị READY
            case 'DOING':
                return 'text-yellow-500'; // Màu vàng cho giá trị DOING
            case 'DONE':
                return 'text-green-500'; // Màu xanh lá cho giá trị DONE
            case 'OUTDATED':
                return 'text-red-500'; // Màu đỏ cho giá trị OUTDATED
            default:
                return ''; // Không áp dụng lớp CSS cho các giá trị khác
            }
        };

    const handleDelete = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/projects/documents/delete/${selectedDocuments}`, {
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
        
            const response = await fetch(`${API_BASE_URL}/api/documents/project?projectId=${localStorage.getItem('projectId')}`, {
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

    const handleSubmit = async (e) => {
    
        const postData = {
            "projectId": id,
            projectName,
            description,
            progress,
            startDate,
            endDate,
        }
        console.log(postData)

        try {
            const response = await fetch(`${API_BASE_URL}/api/projects/update`, {
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
                setIsEditing(false);
                alert('Project Information changed successfully!!!')
                window.location.reload();
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
        <div className="grid grid-cols-2 gap-6">
        {/* Phần Details Info */}
            <div className="border-r-2 p-2">
            <strong className="text-xl font-semibold">Details Information:</strong>
            <br />
            {data ? (
                <>
                    <div className='flex'>
                            {!isEditing ? (
                            <>
                                <div className="mr-12 mt-2">
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Project Name:</strong> {data.projectName}
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Description:</strong> {data.description}
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Progress:  </strong>
                                        <span className={`text-lg font-semibold ${getProgressClass(data.progress)}`}>
                                            {data.progress}
                                        </span>
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Start Date:</strong> {data.startDate}
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>End Date:</strong> {data.endDate}
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Create By:</strong> {data.createdBy}
                                    </div>
                                </div>
                            </>
                                ) : (
                            <>
                                <div className='mr-12 mt-2'>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Project Name:  </strong>
                                        <input 
                                            type='text'
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            placeholder={data.projectName}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Description:  </strong>
                                        <input 
                                            type='text'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={data.description}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Progress:  </strong>
                                        <select
                                            value={progress}
                                            onChange={(e) => setProgress(e.target.value)}
                                        >
                                            <option value="READY">READY</option>
                                            <option value="DOING">DOING</option>
                                            <option value="DONE">DONE</option>
                                            <option value="EXPIRED">OUTDATED</option>
                                        </select>
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Start Date:  </strong>
                                        <input 
                                            type='date'
                                            value={startDate}
                                            placeholder={data.startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>End Date:  </strong>
                                        <input
                                            type='date'
                                            value={endDate}
                                            placeholder={data.endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Create By:  </strong> {data.createdBy}
                                    </div>
                                </div>
                            </>
                                )
                            }
                        </div>
                    
                {/* Button Sửa thông tin */}
                { isEditing ? (
                    <>
                        <button onClick={() => setIsEditing(false)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:ring mt-2">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:ring mt-2 ml-5">
                            Save
                        </button>
                    </>
                ) : (
                    <> 
                        { managers && managers.includes(userId) ? (
                            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:ring mt-5">
                                Edit Information
                            </button>
                        ) : (
                            <p></p>
                        )}
                    </>
                )}
                </>
            ) : (
                <h1>Loading</h1>
            )}
            </div>


            <div>
                <div className="flex items-center">
                    <strong className="text-xl font-semibold">Documents:</strong>
                    { managers && managers.includes(userId) ? (
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
                                { managers && managers.includes(userId) ? (
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

export default ProjectDetail