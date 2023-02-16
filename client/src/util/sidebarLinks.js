import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const sidebarLinks = [
    {
        id: 1,
        path: 'all-jobs',
        text: 'All Jobs',
        icon: <MdQueryStats/>,
    },
    {
        id: 2,
        path: 'add-job',
        text: 'Add Job',
        icon: <FaWpforms/>,
    },
    {
        id: 3,
        path: '/',
        text: 'Stats',
        icon: <IoBarChartSharp/>,
    },
    {
        id: 4,
        path: 'profile',
        text: 'Profile',
        icon: <ImProfile/>,
    },
]

export default sidebarLinks;