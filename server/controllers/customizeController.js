import connection from '../config/connection.js';

export const sendcustomizeFields = async (req, res) => {
    try {
        const { organizationId, fields } = req.body;

        if (!organizationId || !fields || !Array.isArray(fields)) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        // Get the latest version
        const [latestVersion] = await connection.promise().execute(
            'SELECT MAX(version) AS latestVersion FROM CustomFields WHERE organization_id = ?',
            [organizationId]
        );

        const nextVersion = latestVersion[0].latestVersion !== null ? latestVersion[0].latestVersion + 1 : 1;

        const insertQuery =
        'INSERT INTO CustomFields (organization_id, fieldName, fieldType, isOptional, options, version) VALUES (?, ?, ?, ?, ?, ?)';
      
      const fieldInsertPromises = fields.map(field => {
        const { fieldName, fieldType, isOptional, options } = field;

        const parameters = [
          organizationId || null,
          fieldName || null,
          fieldType || null,
          isOptional !== undefined ? isOptional : false, 
          JSON.stringify(options) || null,
          nextVersion || null,
        ];
        if (parameters.includes(undefined)) {
          console.error('Error: Undefined parameter found!');
          return Promise.resolve();
        }
        return connection.execute(insertQuery, parameters);
      });
      
      // Use Promise.all to wait for all field insert promises to resolve
      await Promise.all(fieldInsertPromises);
        res.status(200).json({ message: 'Custom fields updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




export const studentgetCustomFields = async (req, res) => {
    try {
      const organizationId = req.params.organizationId;
      const fields = await connection.promise().execute(
        'SELECT * FROM CustomFields WHERE organization_id = ?',
        [organizationId]
      );
      res.json(fields[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


export const DeleteCustomFieldd = async ( req, res)=>{

  try {
    const organizationId = req.params.organizationId;
    await connection.promise().execute(
      'DELETE FROM CustomFields WHERE organization_id = ?',
      [organizationId]
    );
    res.json({ success: true, message: 'Custom fields deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


  import { uploadImage } from './imageuploadcontroller.js';

    export const fillAndSendFormToOrganization = async (req, res) => {
      try {
        const student_id = req.student.id;
        console.log(student_id);
        const { organizationId } = req.params;
        const { filledForm } = req.body;
    
        let FileOption = '';
    
        if (req.file) {
          FileOption = await uploadImage(req.file.buffer);
          console.log('FileOption:', FileOption);
        } else {
          console.log('no FileOption:', FileOption);
        }
    
        if (!organizationId || !filledForm || !student_id) {
          console.log('Invalid input:', organizationId, student_id, filledForm);
          return res.status(400).json({ error: 'Invalid input' });
        }
    
        const insertQuery = 'INSERT INTO FilledForms (organization_id, student_id, form_data, FileOption) VALUES (?, ?, ?, ?)';
        await connection.promise().execute(insertQuery, [organizationId, student_id, JSON.stringify(filledForm), FileOption]);
    
        res.status(200).json({ message: 'Filled form sent to organization successfully' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };




    
        export const getFilledFormsByStudent = async (req, res) => {
            try {
                const organizationId = req.params.organizationId;

                const selectQuery = `
                SELECT FilledForms.*, Student.first_name, Student.last_name
                FROM FilledForms
                JOIN tenent ON FilledForms.organization_id = tenent.organization_id
                JOIN student ON FilledForms.student_id =student.student_id
                WHERE FilledForms.organization_id = ? AND FilledForms.status = 'pending'
                ORDER BY
                FilledForms.created_at DESC;
            `;
                const [filledForms] = await connection.promise().execute(selectQuery, [organizationId]);
                res.json(filledForms);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };