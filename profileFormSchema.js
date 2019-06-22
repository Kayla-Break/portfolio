import * as yup from 'yup';

let profileFormSchema = yup.object ().shape ({
  houseIncome: yup.string ().required ('Required field'),
  firstName: yup.string ().required ('Required field'),
  lastName: yup.string ().required ('Required Field'),
  phone: yup
    .string ()
    .required ('required')
    .matches (
      /^(0|[1-9][0-9]{9})$/i,
      'Invalid phone number, must be 10 digits'
    ),
  zip: yup
    .number ()
    .required ('required')
    .min (5, 'please enter valid Zip code'),
});

export {profileFormSchema};
