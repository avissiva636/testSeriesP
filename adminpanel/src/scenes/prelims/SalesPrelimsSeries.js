import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import Header from 'components/Header';
import { useOutletContext } from 'react-router-dom';
import SalesPaperTemplate from 'components/SalesPaperTemplate';
import { useDeletePrelimSalesMutation, useGetPSeriesesQuery, useGetcondtionalPrelimSalesQuery } from 'state/apiDevelopmentSlice';

function currentDate() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date;
}

const SalesPrelimsSeries = () => {
  const isNonMobile = useOutletContext();

  const initialSearchValues = {
    userName: "",
    seriesName: "",
    startingDate: currentDate(),
    endingDate: new Date()
  };

  const [searchPsSales, setSearchPsSales] = useState(initialSearchValues);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [salePrelimSort, setSalePrelimSort] = useState({});
  const [serverSearch, setServerSearch] = useState(initialSearchValues);
  const [totalPrice, setTotalPrice] = useState("");



  const { isLoading: isStudentLoading, data: studentList } = useGetcondtionalPrelimSalesQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(salePrelimSort),
    search: JSON.stringify(serverSearch)
  });
  const { isLoading: isPSLoading, data: PsData } = useGetPSeriesesQuery();
  const [deletePsSeries] = useDeletePrelimSalesMutation();



  useEffect(() => {
    if (!isStudentLoading)
      setTotalPrice(studentList?.prelimSales?.reduce((total, pSales) => total + pSales.price, 0));
  }, [isStudentLoading, studentList])

  const handleReset = () => {
    setSearchPsSales(initialSearchValues);
  }

  const handleSearchSubmit = () => {
    setServerSearch(searchPsSales);
    handleReset();
  }

  const deleteClick = async ({ id, title }) => {
    const confirmation = window.confirm(`Are you sure you want to delete ${title}?`);

    if (confirmation) {
      try {
        await deletePsSeries({ psId: id }).unwrap();
      } catch (error) {
        if (error.status === 400) {
          alert(`${title} not deleted`);
        }
      }

    }
  }


  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="PRELIMS" subtitle="Prelims Sale List" />

      <SalesPaperTemplate seriesName="prelims"
        paperData={studentList} ispaperLoading={isStudentLoading}
        seriesData={PsData} isSeriesLoading={isPSLoading}
        searchSeriesSales={searchPsSales} setSearchSeriesSales={setSearchPsSales}
        paginationModel={paginationModel} setPaginationModel={setPaginationModel}
        totalPrice={totalPrice}
        setSaleSeriesSort={setSalePrelimSort}
        handleSearchSubmit={handleSearchSubmit}
        deleteClick={deleteClick}
      />
    </Box>
  )
}

export default SalesPrelimsSeries