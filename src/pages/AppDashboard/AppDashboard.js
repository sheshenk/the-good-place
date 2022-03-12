import BarGraph from "../../components/BarGraph/BarGraph"
import { MainContainer } from "../../components/MainContainer/MainContainer";

const data = [
    {
        name: 'August',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'September',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'October',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'November',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'December',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'January',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'February',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

function AppDashboard(props) {
    return (
        <MainContainer title='Dashboard' drawerWidth={props.drawerWidth}>
            <BarGraph data={data} />
        </MainContainer>
    )
}
export default AppDashboard