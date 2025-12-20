import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';

const Analytics = () => {

    const axiosSecure = useAxiosSecure()

    const { data: summary = {} } = useQuery({
        queryKey: ['application-status-summary'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications/stats/summary');
            return res.data;
        }
    });

    const { data: applicationStatsByScholarshipCategory = [] } = useQuery({
        queryKey: ['application-status-scholarshipCategory'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications/application-status/scholarshipCategory');
            return res.data;
        }
    });

    const { data: applicationStatsByUniversityName = [] } = useQuery({
        queryKey: ['application-status-universityName'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications/application-status/universityName');
            return res.data;
        }
    });

    const getPieChartData = data => {
        return data.map(item => {
            return { name: item.status, value: item.count }
        })
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <title>Analytics</title>
            <h1 className='text-2xl font-bold'>Analytics of Application Status</h1>

            <div className="stats shadow">
                <div className="stat mt-10">
                    <div className="stat-title text-2xl">Total Fees Collected</div>
                    <div className="stat-value">${summary.totalFees}</div>
                </div>

                <div className="stat mt-10">
                    <div className="stat-title text-2xl">Total Users</div>
                    <div className="stat-value">{summary.totalUser}</div>
                </div>

                <div className="stat mt-10">
                    <div className="stat-title text-2xl">Total Scholarships</div>
                    <div className="stat-value">{summary.totalScholarship}</div>
                </div>
            </div>

            <div className='mt-10 flex items-center gap-10'>
                <div className='w-full h-[400px]'>
                    <h1 className=' text-2xl font-bold'>Application Per University</h1>
                    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={getPieChartData(applicationStatsByUniversityName)}
                            cx="50%"
                            cy="100%"
                            outerRadius="120%"
                            fill="#8884d8"
                            label
                            isAnimationActive={true}
                        />
                        <Legend></Legend>
                        <Tooltip></Tooltip>
                    </PieChart>
                </div>
                <div className='w-full h-[400px]'>
                    <h1 className=' text-2xl font-bold'>Application Per Scholarship Category</h1>
                    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={getPieChartData(applicationStatsByScholarshipCategory)}
                            cx="50%"
                            cy="100%"
                            outerRadius="120%"
                            fill="#8884d8"
                            label
                            isAnimationActive={true}
                        />
                        <Legend></Legend>
                        <Tooltip></Tooltip>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default Analytics;