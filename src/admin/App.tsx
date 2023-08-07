import * as React from 'react';
import { Admin, Resource, Title } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { DataList, DataEdit, DataCreate } from '@/components/data';

const dataProvider = jsonServerProvider('https://retoolapi.dev/wHvUV0');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="data" list={DataList} edit={DataEdit} create={DataCreate} />
  </Admin>
);

export default App;
