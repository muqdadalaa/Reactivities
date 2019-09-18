import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';


const App = () => {

  const [activities,setActivities] = useState<IActivity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode,setEditMode] = useState(false);

  const handleSelectedActivity = (id:string) =>
  {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateActivity = () => 
  {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false)
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a=>a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false)
  }

  const handleDeleteActivity = (activity: IActivity) =>{
    setActivities([...activities.filter(a=>a.id !== activity.id)]);
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then(response => {
      let activities: IActivity[] = [];
      response.data.forEach(activity =>{
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      }); 
      setActivities(activities);
    } );
  }, []);

  return (
    <Fragment>
      <NavBar openCreateActivity = {handleOpenCreateActivity} />
      <Container style={{marginTop: '7em'}}>
      <ActivityDashboard
       selectActivity = {handleSelectedActivity}
       activities = {activities}
       activity = {selectedActivity}
       editMode = {editMode}
       setEditMode = {setEditMode}
       setSelectedActivity = {setSelectedActivity}
       createActivity = {handleCreateActivity}
       editActivity = {handleEditActivity}
       deleteActivity ={handleDeleteActivity}
         />
      </Container>
    </Fragment>
  );
}

export default App;
