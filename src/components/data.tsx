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
  useRecordContext,
  Filter,
  useNotify,
  Button
} from 'react-admin';
import React from 'react';
import Popup from './popup';

const DataFilter = (props: any) => {
  return (
    <Filter {...props}>
      <TextInput label="Search Source" source="source" alwaysOn />
      <TextInput label="Search Translation" source="translation" alwaysOn />
      <TextInput label="Search By Use" source="use" alwaysOn />
    </Filter>
  );
};

export const DataList = () => (
  <List title="Dict Augmentation of Azure translation" filters={<DataFilter />}>
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
};

export const DataEdit = () => {
  const [modalContent, setModalContent] = React.useState(null);
  const [formData, setFormData] = React.useState<any>(null);
  const notify = useNotify();

  const handleEditSubmit = (formData: any) => {
    // Make the API call to update data in the table
    fetch(`${process.env.NEXT_PUBLIC_BFF_URL}/translationdictionary/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: formData.source,
        translation: formData.translation,
        use: formData.use,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update data');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the API response for updation
        notify('Data updated successfully');
        setFormData(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        notify('Error updating data');
      });
  };

  const handleShowTranslation = () => {
    if(!formData){
      notify('Please update first to show translations!');
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BFF_URL}/translationdictionary/examples`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source: formData.source,
            translation: formData.translation,
          }),
        })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to generate translations');
        }
        return response.json();
      })
      .then((data) => {
        setModalContent(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        notify("Could not generate translations");
      });
  }

  return (
    <Edit title={<DataTitle />}>
      <SimpleForm onSubmit={handleEditSubmit}>
        <TextInput source="id" disabled />
        <TextInput source="source" />
        <TextInput source="translation" />
        <BooleanInput source="use" />
        {modalContent && <Popup postResponseContent={modalContent} />}
      <Button label="Show Translations" onClick={handleShowTranslation} />
      </SimpleForm>
    </Edit>
  );
};

export const DataCreate = () => {
  const [modalContent, setModalContent] = React.useState(null);
  const [formData, setFormData] = React.useState<any>(null);
  const notify = useNotify();

  const handleFormSubmit = (formData: any) => {
    // Make the API call to create data in the table
    fetch(`${process.env.NEXT_PUBLIC_BFF_URL}/translationdictionary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: formData.source,
        translation: formData.translation,
        use: formData.use,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create data');
        }
        return response.json();
      })
      .then((data) => {
        notify('Data created successfully');
        setFormData(data);
      }).catch(error => {
        console.error('Error:', error);
        notify('Error creating data');
      });
    };

  const handleShowTranslation = () => {
    if(!formData){
      notify('Please create first to show translations!');
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_BFF_URL}/translationdictionary/examples`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source: formData.source,
            translation: formData.translation,
          }),
        })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to generate translations');
        }
        return response.json();
      })
      .then((data) => {
        setModalContent(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        notify("Could not generate translations");
      });
  }

  return (
    <Create title="Create Data">
      <SimpleForm onSubmit={handleFormSubmit}>
        {/* <TextInput source="id" /> */}
        <TextInput source="source" />
        <TextInput source="translation" />
        <BooleanInput source="use" />
        {modalContent && <Popup postResponseContent={modalContent} />}
      <Button label="Show Translations" onClick={handleShowTranslation} />
      </SimpleForm>
    </Create>
  );
};
