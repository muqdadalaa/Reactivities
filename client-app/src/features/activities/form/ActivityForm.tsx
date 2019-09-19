import React, { useState } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid';

interface IProps {
   setEditMode: (editMode: boolean) => void;
   activity: IActivity;
   createActivity: (activity: IActivity) =>void
   editActivity: (activity: IActivity) =>void
   submitting: boolean
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: intialFormState,
  createActivity,
  editActivity,
  submitting
}) => {
  const intialForm = () => {
    if (intialFormState) {
      return intialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(intialForm);

  const handleChangeEvent = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmitEvent = () => {
    if(activity.id.length === 0){
      let newActivity = {
        ...activity, id: uuid()
      }
      createActivity(newActivity);
    }
    else {editActivity(activity)}
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmitEvent}>
        <Form.Input
          onChange={handleChangeEvent}
          name="title"
          placeholder="title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleChangeEvent}
          name="description"
          rows={2}
          placeholder="description"
          value={activity.description}
        />
        <Form.Input
          onChange={handleChangeEvent}
          name="category"
          placeholder="category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleChangeEvent}
          name="date"
          type="datetime-local"
          placeholder="date"
          value={activity.date}
        />
        <Form.Input
          onChange={handleChangeEvent}
          name="city"
          placeholder="city"
          value={activity.city}
        />
        <Form.Input
          onChange={handleChangeEvent}
          name="venue"
          placeholder="venue"
          value={activity.venue}
        />
        <Button loading={submitting} positive floated="right" type="submit" content="submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          content="cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm
