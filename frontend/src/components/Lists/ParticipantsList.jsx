import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { fixColumnsTitle } from "../../helpers/columnsTitles";
import useInsertParticipants from "../../hooks/api/useInsert";
import useListParticipants from "../../hooks/api/useList";
import { StyledButton, StyledTitle } from "./styled";

export default function ParticipantsList() {

    const [participants, setParticipants] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const { listParticipants } = useListParticipants();
    const { insertParticipants } = useInsertParticipants();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allParticipants = await listParticipants();
                setParticipants(allParticipants);
            } catch (error) {
                alert(error.response.data);
            }
        };

        const insertNewParticipants = async () => {
            try {
                await insertParticipants();
                fetchData();
            } catch (error) {
                alert(error.response.data);
            }
        };

        const executeInsertion = async () => {
            await insertNewParticipants();
            const interval = setInterval(insertNewParticipants, 3600000);
            return interval;
        };

        fetchData();

        const intervalId = executeInsertion();

        return () => clearInterval(intervalId);
    }, []);


    const handleChange = (_pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const columns = participants.length > 0
        ? Object.keys(participants[0])
            .filter(key => key !== "id" && key !== "createdAt" && key !== "updatedAt")
            .map(key => {
                const columnConfig = {
                    title: (
                        <StyledTitle>
                            {fixColumnsTitle(key)}
                        </StyledTitle>
                    ),
                    dataIndex: key,
                    key,
                    sorter: (a, b) => {
                        return a[key].localeCompare(b[key]);
                    },
                    sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : null,
                    ellipsis: true,
                };

                if (key === "name") {
                    columnConfig.filters = [...new Set(participants.map(item => item[key]))].map(value => ({
                        text: value,
                        value: value,
                    }));
                    columnConfig.filteredValue = filteredInfo[key] || null;
                    columnConfig.onFilter = (value, record) => record[key].includes(value);
                }

                return columnConfig;
            })
        : [];


    return (
        <>
            <Space
                style={{
                    marginBottom: 16,
                    marginTop: 20,
                }}
            >
                <StyledButton onClick={clearFilters}>Limpar filtros</StyledButton>
                <StyledButton onClick={clearAll}>Limpar tudo</StyledButton>
            </Space>
            <Table
                columns={columns}
                dataSource={participants}
                onChange={handleChange}
                rowKey="id"
                bordered
            />
        </>
    );
}