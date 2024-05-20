import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import Header from 'components/Header';
import { useOutletContext } from 'react-router-dom';
import SalesPaperTemplate from 'components/SalesPaperTemplate';
import { useDeleteMainsSalesMutation, useGetMSeriesesQuery, useGetcondtionalMainsSalesQuery } from 'state/apiDevelopmentSlice';

function currentDate() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date;
}

const SalesMainsSeries = () => {
  const isNonMobile = useOutletContext();

  const initialSearchValues = {
    userName: "",
    seriesName: "",
    startingDate: currentDate(),
    endingDate: new Date()
  };

  const [searchMsSales, setSearchMsSales] = useState(initialSearchValues);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [saleMainsSort, setSaleMainsSort] = useState({});
  const [serverSearch, setServerSearch] = useState(initialSearchValues);
  const [totalPrice, setTotalPrice] = useState("");

  const { isLoading: isStudentLoading, data: studentList } = useGetcondtionalMainsSalesQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(saleMainsSort),
    search: JSON.stringify(serverSearch)
  });
  const { isLoading: isMSLoading, data: MsData } = useGetMSeriesesQuery();
  const [deleteMsSeries] = useDeleteMainsSalesMutation();

  useEffect(() => {
    if (!isStudentLoading)
      setTotalPrice(studentList?.seriesSales?.reduce((total, mSales) => total + mSales.price, 0));
  }, [isStudentLoading, studentList])

  const handleReset = () => {
    setSearchMsSales(initialSearchValues);
  }

  const handleSearchSubmit = () => {
    setServerSearch(searchMsSales);
    handleReset();
  }

  const deleteClick = async ({ id, title }) => {
    const confirmation = window.confirm(`Are you sure you want to delete ${title}?`);

    if (confirmation) {
      try {
        await deleteMsSeries({ msId: id }).unwrap();
      } catch (error) {
        if (error.status === 400) {
          alert(`${title} not deleted`);
        }
      }

    }
  }

  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="MAINS" subtitle="Mains Sale List" />

      <SalesPaperTemplate seriesName="mains"
        paperData={studentList} ispaperLoading={isStudentLoading}
        seriesData={MsData} isSeriesLoading={isMSLoading}
        searchSeriesSales={searchMsSales} setSearchSeriesSales={setSearchMsSales}
        paginationModel={paginationModel} setPaginationModel={setPaginationModel}
        totalPrice={totalPrice}
        setSaleSeriesSort={setSaleMainsSort}
        handleSearchSubmit={handleSearchSubmit}
        deleteClick={deleteClick}
      />
    </Box>
  )
}

export default SalesMainsSeries