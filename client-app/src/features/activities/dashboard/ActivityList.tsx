import React, { SyntheticEvent } from 'react'
import { IActivity } from '../../../app/models/activity'
import { Item, Button, Segment } from 'semantic-ui-react'

interface IProps{
  activities:IActivity[];
  selectActivity: (id:string) => void;
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void
  submitting: boolean
  target : string
}

const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target
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
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  onClick={(e) => deleteActivity(e, activity.id)}
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
