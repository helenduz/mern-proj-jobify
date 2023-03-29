import {
    ResponsiveContainer,
    BarChart as RechartsBarChart, // prevent name clash with this component
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
} from "recharts";

const BarChart = ({ monthlyApplications }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={monthlyApplications} margin={{ top: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                {/* no need for dataKey in YAxis because it defaults to <Bar/>'s dataKey values */}
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#2cb1bc" barSize={40} />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
};

export default BarChart;
