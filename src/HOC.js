import React from 'react'
import withDate from './withDate'

const Calendar = ({date, /*onClick,*/ ...props}) => <p {...props}>Hoy es: {date}</p>

export default withDate(Calendar)