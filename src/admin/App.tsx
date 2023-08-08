import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { DataList, DataEdit, DataCreate } from '@/components/data';

const jsonProvider = jsonServerProvider(process.env.NEXT_PUBLIC_BFF_URL);

const customDataProvider = {
  ...jsonProvider,

  getList: async (resource: any, params: any) => {
    const response = await jsonProvider.getList(resource, params);
    //@ts-ignore
    const { data, totalCount } = response.data;
    return {
      data,
      total: totalCount
    };
  },

  getOne: async (resource: any, params: any) => {
    const response = await jsonProvider.getOne(resource, params);
    return {
      data: response.data
    };
  },

  getMany: async (resource: any, params: any) => {
    const response = await jsonProvider.getMany(resource, params);
    return {
      data: response.data
    };
  },

  create: async (resource: any, params: any) => {
    const response = await jsonProvider.create(resource, params);
    // Ensure the response contains the 'id' key
    if (!response.data.id) {
        console.error('API response for create does not contain an id key:', response.data);
        throw new Error('API response for create does not contain an id key');
    }
    return {
      data: response.data
    };
  },

  update: async (resource: any, params: any) => {
    const response = await jsonProvider.update(resource, params);
    return {
      data: response.data
    };
  },

  delete: async (resource: any, params: any) => {
    const response = await jsonProvider.delete(resource, params);
    return {
      data: response.data
    };
  },
};

const App = () => (
  <Admin dataProvider={customDataProvider}>
    <Resource name="translationdictionary" list={DataList} edit={DataEdit} create={DataCreate} />
  </Admin>
);

export default App;
