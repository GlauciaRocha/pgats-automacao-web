import { faker } from '@faker-js/faker'

export function getRandomNumber() {
  // return new Date().getTime()
  return faker.number.bigInt()
}

export function getRandomEmail() {
  // return `qa-tester-${getRandomNumber()}@teste.com`
  return faker.internet.email({ firstName: 'QATesterpgats' })
}