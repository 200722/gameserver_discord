const reem = {
  age: 25,
  hobby: "fatball",
};

// const { age } = reem;

console.log(reem.age);
// console.log(age);
console.log({ ...reem });

const x = ({ ...reem }) => {};
