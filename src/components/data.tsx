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
  <List title="Dict Augmentation of Azure Translation">
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="Source" />
      <TextField source="Translation" />
      <BooleanField source="Use" />
    </Datagrid>
  </List>
);

const DataTitle = () => {
  const record = useRecordContext();
  return <span>{record ? `"${record.Source}"` : 'Source'}</span>;
}

export const DataEdit = () => (
  <Edit title={<DataTitle/>}>
    <SimpleForm>
      <TextInput source="id" />
      <BooleanInput source="Use" />
      <TextInput source="Source" />
      <TextInput source="Translation" />
    </SimpleForm>
  </Edit>
);

export const DataCreate = () => (
  <Create title="Create Data">
    <SimpleForm>
      <TextInput source="id" />
      <BooleanInput source="Use" />
      <TextInput source="Source" />
      <TextInput source="Translation" />
    </SimpleForm>
  </Create>
);
