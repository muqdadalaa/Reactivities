import React from 'react'
import { IActivity } from '../../../app/models/activity'
import { Item, Button, Segment } from 'semantic-ui-react'

interface IProps{
  activities:IActivity[];
  selectActivity: (id:string) => void;
  deleteActivity: (activity: IActivity) => void
}

const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>{activity.description}</Item.Description>
              <Item.Extra>
                {activity.city}, {activity.venue}
              </Item.Extra>
              <Item.Extra>
                <Button content={activity.category} floated={"left"} />
                <Button
                  onClick={() => selectActivity(activity.id)}
                  content="view"
                  color={"blue"}
                  floated={"right"}
                />
                 <Button
                  onClick={() => deleteActivity(activity)}
                  content="delete"
                  color={"red"}
                  floated={"right"}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList
