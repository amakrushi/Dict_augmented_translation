import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  Create,
  BooleanInput,
  Edit,
  SimpleForm,
  TextInput,
  useRecordContext
} from 'react-admin';

export const DataList = () => (
  <List title="Dict Augmentation of Azure translation">
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="source" />
      <TextField source="translation" />
      <BooleanField source="use" />
    </Datagrid>
  </List>
);

const DataTitle = () => {
  const record = useRecordContext();
  return <span>{record ? `"${record.source}"` : 'source'}</span>;
}

export const DataEdit = () => (
  <Edit title={<DataTitle/>}>
    <SimpleForm>
      <TextInput source="id" disabled/>
      <BooleanInput source="use" />
      <TextInput source="source" />
      <TextInput source="translation" />
    </SimpleForm>
  </Edit>
);

export const DataCreate = () => (
  <Create title="Create Data">
    <SimpleForm>
      {/* <TextInput source="id" /> */}
      <BooleanInput source="use" />
      <TextInput source="source" />
      <TextInput source="translation" />
    </SimpleForm>
  </Create>
);
