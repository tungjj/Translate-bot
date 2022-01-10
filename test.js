const a = [
    {
        a: 'avc',
        b: '123'
    },
    {
        a:'1123',
        b: ' poi'
    }
]
const g = a.reduce((pre, cur)=>{
    return pre.a +', '+ cur.a;
})
console.log(g);