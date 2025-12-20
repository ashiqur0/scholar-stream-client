import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';

const Analytics = () => {

    const axiosSecure = useAxiosSecure()

    const { data: applicationStats = [] } = useQuery({
        queryKey: ['application-status-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications/application-status/stats');
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
                    <div className="stat-value">$10000</div>
                </div>

                <div className="stat mt-10">
                    <div className="stat-title text-2xl">Total Users</div>
                    <div className="stat-value">5</div>
                </div>

                <div className="stat mt-10">
                    <div className="stat-title text-2xl">Total Scholarships</div>
                    <div className="stat-value">22</div>
                </div>
            </div>

            <div className='mt-10'>
                <div>
                </div>
                <div className='w-full h-[400px]'>
                    <h1 className='w-1/2 text-2xl font-bold'>Pie Chart Displaying Number Application Per Scholarship Category</h1>
                    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={getPieChartData(applicationStats)}
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