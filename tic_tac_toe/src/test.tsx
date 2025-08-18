function add(a: number, b: number) {
    return a + b;
}

console.log(add(1, 2));
// add(1, '2');

type Props = {
    count: number;
    name: string;
}

// const props: Props = {
//     count: 1,
//     name: '123'
// }



function test1(props: Props) {
    console.log(props.count);
    console.log(props.name);
}

// test1(props);

function test2(props: Props) {
    console.log(props.count);
    console.log(props.name);
}

test2({
    count: 1,
    name: '123'
})
