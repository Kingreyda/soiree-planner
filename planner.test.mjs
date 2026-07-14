import test from 'node:test';
import assert from 'node:assert/strict';
import { addGuest, formatGuestStatus, formatPlusOne } from './planner.mjs';

test('addGuest prepends new guests and records a plus-one', () => {
  const guests = [{ name: 'Mina', status: 'Attending', plusOne: 'No' }];
  const nextGuests = addGuest(guests, { name: 'Nico', status: 'Regrets', plusOne: 'Yes' });

  assert.equal(nextGuests[0].name, 'Nico');
  assert.equal(nextGuests[0].status, 'Regrets');
  assert.equal(nextGuests[0].plusOne, 'Yes');
  assert.equal(nextGuests[1].name, 'Mina');
});

test('format helpers turn RSVP values into display text', () => {
  assert.equal(formatGuestStatus('Attending'), 'Attending');
  assert.equal(formatGuestStatus('Regrets'), 'Regrets');
  assert.equal(formatPlusOne(true), 'Yes');
  assert.equal(formatPlusOne(false), 'No');
});
