import {Alert} from '../imports';

// Custome alert popup, kind of popup depends on params
export default function MessageBox(props) {
  return <Alert variant={props.variant || 'info'}>
    {props.children}
    </Alert>;
}