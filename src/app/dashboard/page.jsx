// pages/dashboard.jsx
'use client';
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, Button, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Line } from 'react-chartjs-2';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Links from "../SidebarLinksData";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chart.js/auto';
import { useContent } from "../contexts/ContentContext";
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Overall Monthly Performance',
      data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 75, 90, 100],
      fill: false,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        beginAtZero: true,
      },
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const homeLink = Links.find(link => link.name === 'Home');
const dashboardLink = Links.find(link => link.name === 'Dashboard');
const { setSearchTerm } = useContent();
const router = useRouter();
useEffect(() => {
  setSearchTerm("");
}, []);
  //  const variants = ["solid", "bordered", "light"];
  return (
    <div className="flex flex-col md:flex-row h-screen bg-bodybg">
      <Sidebar Links={Links} className="flex-none w-full md:w-auto" />
      <div className="flex-1 flex flex-col overflow-hidden sm:ml-8">
        <Header />
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-8 sm:ml-8">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <div className="mb-8">
            <div className="flex flex-col flex-wrap gap-4">
        <Breadcrumbs key='solid' variant='solid'>
          <BreadcrumbItem  href={homeLink.href} startContent={ homeLink && <homeLink.icon className="home-icon" />}>Home</BreadcrumbItem>
          <BreadcrumbItem href={dashboardLink.href} startContent={dashboardLink && <dashboardLink.icon className="dashboard-icon" />}>Dashboard</BreadcrumbItem>
        </Breadcrumbs>
     
    </div>
            </div>

            {/* Hi, User */}
            <div className="mb-8">
              <p className="text-xl font-bold text-icon">Hi, User!</p>
            </div>

            {/* User Profile and Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="col-span-1">
                {/* <Card className="w-full bg-gradient-to-r from-blue-100 to-blue-200">
                  <CardHeader className="flex items-center">
                    <p>User Profile</p>
                  </CardHeader>
                  <CardBody>
                    <p>[Link to profile settings]</p>
                  </CardBody>
                </Card> */}
              </div>
              <div className="col-span-1">
                {/* <Card className="w-full bg-gradient-to-r from-green-100 to-green-200">
                  <CardHeader className="flex items-center">
                    <p>Statistics Overview</p>
                  </CardHeader>
                  <CardBody>
                    <p>Total Blogs: [Number]</p>
                    <p>Total Articles: [Number]</p>
                    <p>Total Videos: [Number]</p>
                  </CardBody>
                </Card> */}
              </div>
            </div>

            {/* Monthly Active Users and Content Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="col-span-1">
                <Card className="w-full bg-gradient-to-r from-pink-100 to-pink-200">
                  <CardHeader className="flex items-center">
                    <p>10,000 Monthly Active Users</p>
                  </CardHeader>
                </Card>
              </div>
              <div className="col-span-1">
                <Card className="w-full bg-gradient-to-r from-yellow-100 to-yellow-200">
                  <CardHeader className="flex items-center">
                    <p>Content Uploads: 1000</p>
                  </CardHeader>
                </Card>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="col-span-1">
                <Card className="w-full bg-gradient-to-r from-indigo-100 to-indigo-200">
                  <CardHeader>
                    <p className="text-lg font-semibold">Overall Monthly Performance</p>
                  </CardHeader>
                  <CardBody>
                    <Line data={data} options={lineChartOptions} />
                  </CardBody>
                </Card>
              </div>
              <Card className="w-full bg-gradient-to-r from-purple-100 to-purple-200">
                  <CardHeader>
                  <p className="text-lg mb-4">Add Content</p>
                  </CardHeader>
                  <CardBody>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:items-center sm:pb-16 h-full ">
                <Button onClick={()=>{router.push('/blogs/addBlog')}} className="w-full">New Blog</Button>
                <Button onClick={()=>{router.push('/articles/addArticle')}} className="w-full">New Article</Button>
                <Button onClick={()=>{router.push('/videos/addVideo')}} className="w-full">New Video</Button>
              </div>
                  </CardBody>
                </Card>
              {/* <div className="mb-8 flex flex-col justify-center">
              
             
            </div> */}
              {/* <div className="mb-8 flex flex-col justify-center">
              <p className="text-lg mb-4">Add Content</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
                <Button className="w-full">New Blog</Button>
                <Button className="w-full">New Article</Button>
                <Button className="w-full">New Video</Button>
              </div>
            </div> */}
            </div>

            {/* Add Content */}
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





// // pages/dashboard.jsx
// 'use client';

// import { Card, CardHeader, CardBody, CardFooter, Progress } from "@nextui-org/react";
// import { Line } from 'react-chartjs-2';
// import Sidebar from '../components/sidebar';
// import Header from '../components/header';
// import Links from "../SidebarLinksData";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import 'chart.js/auto';


// const data = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   datasets: [
//     {
//       label: 'Overall Monthly Performance',
//       data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 75, 90, 100],
//       fill: false,
//       backgroundColor: 'rgba(75,192,192,1)',
//       borderColor: 'rgba(75,192,192,1)',
//     },
//   ],
// };
// const lineChartOptions = {
//   responsive: true,
//   plugins: {
//     legend: {
//       display: false,
//     },
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false,
//       },
//     },
//     y: {
//       ticks: {
//         beginAtZero: true,
//       },
//     },
//   },
// };

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const dashboard = () => {
//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-bodybg">
//   <Sidebar Links={Links} className="flex-none w-full md:w-auto" />
//   <div className="flex-1 flex flex-col overflow-hidden sm:ml-8">
//     <Header />
//     <div className="flex-1 overflow-x-hidden overflow-y-auto p-8 sm:ml-8">
//       <div className="container mx-auto px-4">
//         {/* First grid for large cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//           <div className="col-span-1">
//             <Card className="w-full">
//               <CardHeader className="flex items-center">
//                 <p>10,000 Monthly Active Users</p>
//               </CardHeader>
//             </Card>
//           </div>
//           <div className="col-span-1">
//             <Card className="w-full">
//               <CardHeader className="flex items-center">
//                 <p>500 Consultation Books This Week</p>
//               </CardHeader>
//             </Card>
//           </div>
//           <div className="col-span-1">
//             <Card className="w-full">
//               <CardHeader className="flex items-center">
//                 <p>Revenue Generated Over The Quarter: $50,000</p>
//               </CardHeader>
//               <CardBody>
//                 <Progress value={60} color="success" />
//               </CardBody>
//             </Card>
//           </div>
//         </div>

//         {/* Second grid for smaller cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//           <div className="col-span-1 sm:w-auto">
//             <Card>
//               <CardHeader>
//                 <p className="text-lg font-semibold">Overall Monthly Performance</p>
//               </CardHeader>
//               <CardBody>
//                 <Line data={data} options={lineChartOptions} />
//               </CardBody>
//             </Card>
//           </div>
//           <div className="col-span-1 sm:w-auto">
//             <Card>
//               <CardHeader className="flex items-center">
//                 <p>User Satisfaction Rating: 4.5</p>
//               </CardHeader>
//             </Card>
//           </div>
//         </div>

//         {/* Third grid for more cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="col-span-1">
//             <Card>
//               <CardHeader className="flex items-center">
//                 <p>Appointment Slots: 200</p>
//               </CardHeader>
//             </Card>
//           </div>
//           <div className="col-span-1">
//             <Card>
//               <CardHeader className="flex items-center">
//                 <p>Content Uploads: 1000</p>
//               </CardHeader>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// };

// export default dashboard;
