
const colors = {
    A: `hsla(0, 100%, 50%, .7)`,
        A1: `hsla(10, 100%, 50%, .7)`,
        A2: `hsla(15, 100%, 50%, .7)`,
        A3: `hsla(20, 100%, 50%, .7)`,
    B: `hsla(30, 100%, 50%, .7)`,
        B1: `hsla(40, 100%, 50%, .7)`,
        B2: `hsla(45, 100%, 50%, .7)`,
        B3: `hsla(50, 100%, 50%, .7)`,
    C: `hsla(60, 100%, 50%, .7)`,
        C1: `hsla(75, 100%, 50%, .7)`,
        C2: `hsla(90, 100%, 50%, .7)`,
        C3: `hsla(105, 100%, 50%, .7)`,
    D: `hsla(120, 100%, 50%, .7)`,
        D1: `hsla(150, 100%, 50%, .7)`,
        D2: `hsla(180, 100%, 50%, .7)`,
        D3: `hsla(210, 100%, 50%, .7)`,
    E: `hsla(240, 100%, 50%, .7)`,
        E1: `hsla(250, 100%, 50%, .7)`,
        E2: `hsla(260, 100%, 50%, .7)`,
        E3: `hsla(270, 100%, 50%, .7)`,
    F: `hsla(275, 100%, 25%, .7)`,
    G: `hsla(280, 100%, 50%, .7)`,
        G1: `hsla(295, 100%, 50%, .7)`,
        G2: `hsla(310, 100%, 50%, .7)`,
        G3: `hsla(325, 100%, 50%, .7)`,
}

const tileCodes = [
    't11', 't11', 't11', 't11', 't12', 't12', 't13', 't13', 't14', 't14', 't15', 't15', 't16', 't16', 't17', 't17', 't16', 't16', 't15', 't15', 't14', //1
    't11', 't11', 't11', 't12', 't12', 't13', 't13', 't14', 't14', 't15', 't15', 't16', 't16', 't17', 't17', 't16', 't16', 't15', 't15', 't14', 't14', //2
    't11', 't11', 't12', 't12', 't13', 't13', 't14', 't14', 't15', 't15', 't16', 't16', 't17', 't17', 't16', 't16', 't15', 't15', 't14', 't14', 't13', //3
    't11', 't12', 't12', 't13', 't13', 't14', 't14', 't15', 't15', 't16', 't16', 't17', 't17', 't16', 't16', 't15', 't15', 't14', 't14', 't13', 't13', //4
    't12', 't12', 't13', 't13', 't14', 't14', 't15', 't15', 't16', 't16', 't17', 't17', 't16', 't16', 't15', 't15', 't14', 't14', 't13', 't13', 't12', //5
    't12', 't13', 't13', 't14', 't14', 't15', 't15', 't16', 't16', 't17', 't17', 't16', 't16', 't15', 't15', 't14', 't14', 't13', 't13', 't12', 't12', //6
    't13', 't13', 't14', 't14', 't15', 't15', 't16', 't16', 't17', 't17', 't16', 't16', 't15', 't15', 't14', 't14', 't13', 't13', 't12', 't12', 't11', //7
    't13', 't14', 't14', 't15', 't15', 't16', 't16', 't17', 't17', 't16', 't16', 't15', 't15', 't14', 't14', 't13', 't13', 't12', 't12', 't11', 't11', //8
    't14', 't14', 't15', 't15', 't16', 't16', 't17', 't17', 't16', 't16', 't15', 't15', 't14', 't14', 't13', 't13', 't12', 't12', 't11', 't11', 't11', //9
    't14', 't15', 't15', 't16', 't16', 't17', 't17', 't16', 't16', 't15', 't15', 't14', 't14', 't13', 't13', 't12', 't12', 't11', 't11', 't11', 't11' //10
  ];

export { colors, tileCodes };