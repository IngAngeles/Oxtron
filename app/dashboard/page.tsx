"use client";

import DataStats from '@/components/charts/dataStats';
import TitleHandler from '@/components/TitleHandler';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { ControlData, EmissionPercentageProps, EmissionTonsProps, GasPercentage, GasTons, TableDataProps } from '@/constants/types';
import { fetchDash } from '@/actions/dashboard';
import EnvironmentalTable from '@/components/charts/environmentalTable';
import CaptureEmissions from '@/components/charts/captureEmissions';
import Loading from '@/components/loading/LoadingBlack';  
import ErrorPage from '@/components/loading/ErrorPageBlack';
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('@/components/charts/barChart'), { ssr: false });
const CircleChart = dynamic(() => import('@/components/charts/circleChart'), { ssr: false });
const EqualizerChart = dynamic(() => import('@/components/charts/equalizerChart'), { ssr: false });

const Home = () => {
  const [data, setData] = useState<ControlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  // Green House Emissions
  const [gasTons, setGasTons] = useState<GasTons | null>(null);
  const [gasPercentage, setGasPercentage] = useState<GasPercentage | null>(null);
  // Emission Distribution
  const [emissionTons, setEmissionTons] = useState<EmissionTonsProps | null>(null);
  const [emissionPercentage, setEmissionPercentage] = useState<EmissionPercentageProps | null>(null);
  // Stats
  const [totalEmissions, setTotalEmissions] = useState<number | null>(null);
  const [impactEquivalence, setImpactEquivalence] = useState<number | null>(null);
  const [sectorComparison, setSectorComparison] = useState<number | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  // Contact
  const [capture, setCapture] = useState<number | null>(null);
  // Table Data
  const [tableData, setTableData] = useState<TableDataProps[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDash();
        setData(response);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Historic Emissions
  const cscData = data.map(item => item.csc);
  const producedData = data.map(item => item.produced);
  const capturedData = data.map(item => item.captured);

  // Green House Emissions
  useEffect(() => {
    if (data.length > 0) {
      const firstItem = data[0];

      // Greenhouse Emissions
      const gasTonsData: GasTons = {
        ggE_BCO2_T: firstItem.ggE_BCO2_T ?? 0,
        ggE_CH4_T: firstItem.ggE_CH4_T ?? 0,
        ggE_CO2_T: firstItem.ggE_CO2_T ?? 0,
        ggE_N20_T: firstItem.ggE_N20_T ?? 0,
      };

      const gasPercentageData: GasPercentage = {
        ggE_BCO2_P: firstItem.ggE_BCO2_P ?? 0,
        ggE_CH4_P: firstItem.ggE_CH4_P ?? 0,
        ggE_CO2_P: firstItem.ggE_CO2_P ?? 0,
        ggE_N20_P: firstItem.ggE_N20_P ?? 0,
      };

      setGasTons(gasTonsData);
      setGasPercentage(gasPercentageData);

      // Emission Distribution
      const emissionTonsData: EmissionTonsProps = {
        eD_Scope1_T: firstItem.eD_Scope1_T ?? 0,
        eD_Stationary_T: firstItem.eD_Stationary_T ?? 0,
        eD_Mobile_T: firstItem.eD_Mobile_T ?? 0,
        eD_Refrigerants_T: firstItem.eD_Refrigerants_T ?? 0,
        eD_Biogenic_T: firstItem.eD_Biogenic_T ?? 0,
        eD_Scope2_T: firstItem.eD_Scope2_T ?? 0,
        eD_Location_T: firstItem.eD_Location_T ?? 0,
        eD_Market_T: firstItem.eD_Market_T ?? 0,
        eD_Heat_T: firstItem.eD_Heat_T ?? 0,
        eD_Scope3_T: firstItem.eD_Scope3_T ?? 0,
        eD_Transport_T: firstItem.eD_Transport_T ?? 0,
        eD_Business_T: firstItem.eD_Business_T ?? 0,
        eD_Employee_T: firstItem.eD_Employee_T ?? 0,
        eD_Biogenic2_T: firstItem.eD_Biogenic2_T ?? 0,
      };

      const emissionPercentageData: EmissionPercentageProps = {
        eD_Scope1_P: firstItem.eD_Scope1_P ?? 0,
        eD_Stationary_P: firstItem.eD_Stationary_P ?? 0,
        eD_Mobile_P: firstItem.eD_Mobile_P ?? 0,
        eD_Refrigerants_P: firstItem.eD_Refrigerants_P ?? 0,
        eD_Biogenic_P: firstItem.eD_Biogenic_P ?? 0,
        eD_Scope2_P: firstItem.eD_Scope2_P ?? 0,
        eD_Location_P: firstItem.eD_Location_P ?? 0,
        eD_Market_P: firstItem.eD_Market_P ?? 0,
        eD_Heat_P: firstItem.eD_Heat_P ?? 0,
        eD_Scope3_P: firstItem.eD_Scope3_P ?? 0,
        eD_Transport_P: firstItem.eD_Transport_P ?? 0,
        eD_Business_P: firstItem.eD_Business_P ?? 0,
        eD_Employee_P: firstItem.eD_Employee_P ?? 0,
        eD_Biogenic2_P: firstItem.eD_Biogenic2_P ?? 0,
      };

      setEmissionTons(emissionTonsData);
      setEmissionPercentage(emissionPercentageData);

      // Stats
      setTotalEmissions(firstItem.eipF_TotalCO2e ?? 0);
      setImpactEquivalence(firstItem.impactEquivalence ?? 0);
      setSectorComparison(firstItem.sectorComparison ?? 0);
      setProgress(firstItem.eipF_Progress ?? 0);

      // Capture
      setCapture(firstItem.captureEmissions ?? 0);

      // Table Data
      const processedData = data
        .map(item => ({
          id: item.eipF_Facility_Id,
          alcance1: item.eipF_Scope1,
          alcance2: item.eipF_Scope2,
          alcance3: item.eipF_Scope3,
          totalCO2e: item.eipF_TotalCO2e,
          progreso: `${item.eipF_Progress}%`
        }))
        .filter(item => item.id && item.id !== '_'); 
      setTableData(processedData);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading /> 
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <ErrorPage />
      </div>
    );
  }

  return (
    <div className='min-h-screen overflow-hidden p-6 lg:ml-64 ml-0'>
      <TitleHandler title="Dashboard" text='Discover the environmental impact of daily activities' />
      <div className='mt-2 flex flex-col gap-8'>
        <div className="w-full">
          <EqualizerChart csc={cscData} produced={producedData} captured={capturedData}/>
        </div>
        <div className="w-full flex gap-8 flex-wrap lg:flex-nowrap">
          <BarChart gasPercentage={gasPercentage} gasTons={gasTons}/>
          <CircleChart EmissionTons={emissionTons} EmissionPercentage={emissionPercentage}/>
        </div>
        <div className='mt-4 flex flex-col lg:flex-row gap-10 justify-between flex-wrap'>
          <DataStats name="Total Emissions Produced" stats={totalEmissions} unit="T CO2e" />
          <DataStats name="Impact Equivalence" stats={impactEquivalence} unit="Water Bottles" />
          <DataStats name="Sector Comparison" stats={sectorComparison} unit="%" />
          <DataStats name="Progress" stats={progress} unit="%" />
        </div>
        <div className='w-full flex gap-10 lg:flex-nowrap flex-wrap'>
          <EnvironmentalTable data={tableData}/>
          <CaptureEmissions captureEmissions={capture}/>
        </div>
      </div>
    </div>
  );
}

export default Home;
