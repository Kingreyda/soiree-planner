export function addGuest(guests, guest) {
  return [{ ...guest }, ...guests];
}

export function formatGuestStatus(status) {
  return status === 'Regrets' ? 'Regrets' : 'Attending';
}

export function formatPlusOne(hasPlusOne) {
  return hasPlusOne ? 'Yes' : 'No';
}
