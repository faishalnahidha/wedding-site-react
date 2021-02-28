/* eslint-disable indent */
export default function mapRsvp(rsvp) {
  switch (rsvp) {
    case 'Yes':
      return 'Hadir';
    case 'No':
      return 'Tidak Hadir';
    case 'Maybe':
      return 'Mungkin Hadir';
    default:
      return '';
  }
}
