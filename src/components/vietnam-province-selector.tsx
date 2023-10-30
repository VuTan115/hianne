'use client';
import {
  IDistrict,
  IProvinces,
  provinceService,
} from '@/lib/province-services';
import React, { memo, useCallback, useEffect, useState } from 'react';

const VietNameProvinceSelector: React.FC = () => {
  const [provinces, setProvinces] = useState<IProvinces[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const handleSelectProvinces = useCallback(async (province_code: number) => {
    provinceService
      .fetchDistricts(province_code)
      .then((res) => setDistricts(res));
  }, []);
  const getProvincesData = useCallback(async () => {
    provinceService.fetchProvinces().then((res) => setProvinces(res));
  }, []);
  useEffect(() => {
    !provinces.length && getProvincesData();
  }, [provinces.length]);
  return (
    <>
      <div>
        <label
          htmlFor='province'
          className='block text-sm font-medium text-gray-700'
        >
          Thành phố/Tỉnh
        </label>
        <div className='mt-1'>
          <select
            id='province'
            name='province'
            defaultValue='null'
            autoComplete='province-name'
            className='w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-1 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            onChange={(e) => {
              handleSelectProvinces(parseInt(e.target.value, 10));
            }}
          >
            <option value='null' disabled>
              -- Chọn thành phố hoặc tỉnh
            </option>
            {provinces.map((item) => (
              <option key={item.codename} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor='district'
          className='block text-sm font-medium text-gray-700'
        >
          Quận/Huyện
        </label>
        <div className='mt-1'>
          <select
            id='district'
            name='district'
            defaultValue='null'
            autoComplete='district-name'
            className='w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-1 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          >
            <option value='null' disabled>
              -- Chọn quận huyện
            </option>
            {districts.map((item) => (
              <option key={item.codename} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default memo(VietNameProvinceSelector);
