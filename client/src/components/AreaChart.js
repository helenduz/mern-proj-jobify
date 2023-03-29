import {
    ResponsiveContainer,
    AreaChart as RechartsAreaChart, // prevent name clash with this component
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area,
} from "recharts";

const AreaChart = ({ monthlyApplications }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart data={monthlyApplications} margin={{ top: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                {/* no need for dataKey in YAxis because it defaults to <Bar/>'s dataKey values */}
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#2cb1bc"
                    fill="#bef8fd"
                />
            </RechartsAreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChart;
