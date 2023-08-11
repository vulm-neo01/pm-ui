import React, {useEffect, useState} from 'react'
import { useParams } from 'next/navigation';
import { getManagerIdList, getTaskList } from '@/app/api/projectAPI';
import RenderTask from '../../tasks/RenderTask';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/app/api/apiBase';

const TaskList = () => {
    const params = useParams();
    const id = params.projectId;
    const [tasks, setTasks] = useState(null);
    const [managerIds, setManagerIds] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const userId = Cookies.get('userId');

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState('READY');
    const [priority, setPriority] = useState('LOW');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        // Gọi hàm fetchUserData từ module api.js
        getTaskList(id)
            .then((responseData) => {
                setTasks(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });

        getManagerIdList(id)
            .then((responseData) => {
                setManagerIds(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
    }, []);

    const handleOpenModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const postData = {
            taskName,
            description,
            priority: priority.toUpperCase(),
            progress: progress.toUpperCase(),
            startDate,
            endDate,
            'projectId': localStorage.getItem('projectId'),
            'createdId': Cookies.get('userId'),
            'createdBy': Cookies.get('user'),
        }
        console.log(postData)

        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks`, {
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
                setShowModal(false);
            } else {
                // Xử lý phản hồi từ server nếu đăng nhập không thành công
                console.log('Post failed!');
                console.log(postData)
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-6">
                {/* Phần 1: READY */}
                <div className="rounded-lg p-2 bg-gray-100">
                    <strong className="block mb-4 text-xl text-blue-600">READY</strong>
                    {tasks ? (
                    tasks
                        .filter((task) => task.progress === "READY")
                        .sort((a, b) => {
                            // Sắp xếp theo độ ưu tiên: HIGH -> MEDIUM -> LOW
                            const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
                            return priorityOrder[b.priority] - priorityOrder[a.priority];
                        })
                        .map((task) => <RenderTask key={task.taskId} task={task} color={'#8DEEEE'}/>)
                    ) : (
                    <h1>No task finding!</h1>
                    )}
                </div>

                {/* Phần 2: DOING */}
                <div className="rounded-lg p-2 bg-gray-100">
                    <strong className="block mb-4 text-xl text-yellow-500">DOING</strong>
                    {tasks ? (
                    tasks
                        .filter((task) => task.progress === "DOING")
                        .sort((a, b) => {
                            // Sắp xếp theo độ ưu tiên: HIGH -> MEDIUM -> LOW
                            const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
                            return priorityOrder[b.priority] - priorityOrder[a.priority];
                        })
                        .map((task) => <RenderTask key={task.taskId} task={task} color={'#FFFF66'}/>)
                    ) : (
                    <h1>No task finding!</h1>
                    )}
                </div>

                {/* Phần 3: DONE */}
                <div className="rounded-lg p-2 bg-gray-100">
                    <strong className="block mb-4 text-xl text-green-500">DONE</strong>
                    {tasks ? (
                    tasks
                        .filter((task) => task.progress === "DONE")
                        .sort((a, b) => {
                            // Sắp xếp theo độ ưu tiên: HIGH -> MEDIUM -> LOW
                            const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
                            return priorityOrder[b.priority] - priorityOrder[a.priority];
                        })
                        .map((task) => <RenderTask key={task.taskId} task={task} color={'#66FF66'}/>)
                    ) : (
                    <h1>No task finding!</h1>
                    )}
                </div>

                {/* Phần 4: OUTDATED */}
                <div className="rounded-lg p-2 bg-gray-100">
                    <strong className="block mb-4 text-xl text-red-500">OUTDATED</strong>
                    {tasks ? (
                    tasks
                        .filter((task) => task.progress === "OUTDATED")
                        .sort((a, b) => {
                            // Sắp xếp theo độ ưu tiên: HIGH -> MEDIUM -> LOW
                            const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
                            return priorityOrder[b.priority] - priorityOrder[a.priority];
                        })
                        .map((task) => <RenderTask key={task.taskId} task={task} color={'#FF6699'}/>)
                    ) : (
                    <h1>No task finding!</h1>
                    )}
                </div>
        </div>

        {managerIds && managerIds.length > 0 && managerIds.includes(userId) && (
            <div className="flex justify-center mt-4">
                <button onClick={handleOpenModal} className="bg-blue-500 text-white hover:bg-blue-600 font-semibold py-2 px-4 rounded focus:ring">
                    Add New Task
                </button>
            </div>
        )}

        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-2 w-full max-w-sm rounded-md shadow-md border-2 mt-8">
                <button className=" text-gray-500" onClick={handleCloseModal}>
                    {/* Dấu X (hoặc biểu tượng đóng khác) */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h1 className="text-2xl font-bold mb-2 text-center">Create new Task</h1>
                <form>
                {/* Các trường thông tin ở đây */}
                <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="taskName">
                    Task Name
                    </label>
                    <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Backend: Apply Spring Security!"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="First study about Spring Security at link: http://youtube.com/watch"
                        rows="3" // Số dòng hiển thị ban đầu
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="priority">
                        Priority
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </div>
                <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="progress">
                        Progress
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        value={progress}
                        onChange={(e) => setProgress(e.target.value)}
                    >
                        <option value="READY">READY</option>
                        <option value="DOING">DOING</option>
                        <option value="DONE">DONE</option>
                        <option value="OUTDATED">OUTDATED</option>
                    </select>
                </div>
                <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="startDate">
                    Start Date
                    </label>
                    <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="endDate">
                    End Date
                    </label>
                    <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                {/* Các trường thông tin khác */}
                <div className="flex justify-center">
                    <button
                    className="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                    type="submit"
                    onClick={handleSubmit}
                    >
                    Submit
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        </>
    )
}

export default TaskList