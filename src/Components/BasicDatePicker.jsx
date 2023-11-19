import React ,{useState} from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const  BasicDatePicker = ({ onChangeDate , isEnd,isStartDate }) => {

  const  today = dayjs()
  const start = dayjs("2022-01-01");

  const [value, setValue] = useState(today);
  const [startDate, setStartDate] = useState(start)

  const handleDateChange = (newValue) => {
    setValue(newValue);
    // Llamar a la función proporcionada por el componente padre
    if (onChangeDate) {
      onChangeDate(newValue);
    }
  };

  const fechaDayjs = dayjs(isStartDate);


    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker           
          label="Controlled picker"
          value={value}
          maxDate={today}
          minDate={isEnd ? fechaDayjs : startDate }
          defaultValue={today}
          onChange={handleDateChange}/>
        </DemoContainer>
      </LocalizationProvider>
    );
  }

export default BasicDatePicker