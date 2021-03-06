const { 
    sumMultiples,
    isValidDNA,
    getComplementaryDNA,
    isItPrime,
    createMatrix,
    areWeCovered
} = require("../challenges/exercise006");

describe("sumMultiples", () => {
    test("check if multiples of 3 and/or 5 are summed", () => {
        expect(sumMultiples([1,3,6])).toBe(9)
        expect(sumMultiples([2,5,10])).toBe(15)
        expect(sumMultiples([1,3,10])).toBe(13)
    })
    test("check if no multiples equals 0", () => {
        expect(sumMultiples([1,2,7,11])).toBe(0)
        expect(sumMultiples([])).toBe(0)
    })
    test("check function requires an array", () => {
        expect(() => {
            sumMultiples()
        }).toThrow("arr is required")
        expect(() => {
            sumMultiples("teststring")
        }).toThrow("arr must be an Array")
    })
})

describe("isValidDNA", () => {
    test("check that valid string returns true", () => {
        expect(isValidDNA("CGTA")).toBe(true)
        expect(isValidDNA("CCCC")).toBe(true)
        expect(isValidDNA("CGATAGTACAGATA")).toBe(true)
    })
    test("check that mixed string return false", () => {
        expect(isValidDNA("CGPWTA")).toBe(false)
        expect(isValidDNA("C20CCC")).toBe(false)
        expect(isValidDNA("CGP03GAGATA")).toBe(false)
    })
    test("check that invalid string return false", () => {
        expect(isValidDNA("ARPW")).toBe(false)
        expect(isValidDNA("2039422")).toBe(false)
        expect(isValidDNA("!)#K$%I#FJ")).toBe(false)
    })
    test("check function requires a string", () => {
        expect(() => {
            isValidDNA()
        }).toThrow("str is required")
        expect(() => {
            isValidDNA(2)
        }).toThrow("str must be a String")
        expect(() => {
            isValidDNA(["GATA","CGTA"])
        }).toThrow("str must be a String")
    })
})

describe("getComplementaryDNA", () => {
    // testing of the 'validDNA' function happens above
    test("check that an invalid or empty DNA string returns false", () => {
        expect(() => {
            getComplementaryDNA("fjw920ew")
        }).toThrow("str must be valid DNA (only C,G,T,A)")
        expect(() => {
            getComplementaryDNA()
        }).toThrow("str is required")
        expect(() => {
            getComplementaryDNA(2)
        }).toThrow("str must be a String")
        expect(() => {
            getComplementaryDNA(["GATA","CGTA"])
        }).toThrow("str must be a String")
    })
    test("check that a valid DNA string returns valid pairs", () => {
        expect(getComplementaryDNA("ACTG")).toBe("TGAC")
        expect(getComplementaryDNA("TGAC")).toBe("ACTG")
        expect(getComplementaryDNA("CCCCCC")).toBe("GGGGGG")
    })
})

describe("isItPrime", () => {
    test("check that prime number returns true", () => {
        expect(isItPrime(7)).toBe(true)
        expect(isItPrime(13)).toBe(true)
        expect(isItPrime(23.0)).toBe(true)
    })
    test("check that non-prime number returns false", () => {
        expect(isItPrime(2)).toBe(false)
        expect(isItPrime(14)).toBe(false)
        expect(isItPrime(21)).toBe(false)
        expect(isItPrime(0)).toBe(false)
        expect(isItPrime(1)).toBe(false)
        expect(isItPrime(-3)).toBe(false)
        expect(isItPrime(-13)).toBe(false)
    })
    test("check function requires a Number", () => {
        expect(() => {
            isItPrime()
        }).toThrow("n is required")
        expect(() => {
            isItPrime("ABC")
        }).toThrow("n must be a Number")
        expect(() => {
            isItPrime(["GATA","CGTA"])
        }).toThrow("n must be a Number")
    })
})

describe("createMatrix", () => {
    test("check that a valid matrix is created", () => {
        const r1 = [
             ["foo", "foo", "foo"],
             ["foo", "foo", "foo"],
             ["foo", "foo", "foo"]
         ]
        expect(createMatrix(3, "foo")).toEqual(r1)

        const r2 = [
            [5, 5, 5, 5],
            [5, 5, 5, 5],
            [5, 5, 5, 5],
            [5, 5, 5, 5]
        ]
        expect(createMatrix(4, 5)).toEqual(r2)
    })
    test("check function requires n {Number} and fill {Any}", () => {
        expect(() => {
            createMatrix()
        }).toThrow("n is required")
        expect(() => {
            createMatrix(5)
        }).toThrow("fill is required")
        expect(() => {
            createMatrix("ABC", "Test")
        }).toThrow("n must be a Number")
        expect(() => {
            createMatrix(-1, "Test")
        }).toThrow("n must be a Positive Number")
    })
})

describe("areWeCovered", () => {
    test("check that rota is processed correctly", () => {
        const r1 = [
             { name: "John", rota: ["Monday", "Tuesday", "Wednesday", "Sunday"] },
             { name: "Jane", rota: ["Tuesday", "Wednesday", "Thursday", "Sunday"] },
             { name: "Jake", rota: ["Wednesday", "Thursday", "Friday", "Sunday"] },
             { name: "Jeff", rota: ["Thursday", "Friday", "Sunday"] }
         ]
        expect(areWeCovered(r1, "Monday")).toEqual(false) // 1 person working
        expect(areWeCovered(r1, "Tuesday")).toEqual(false) // 2 people working
        expect(areWeCovered(r1, "Wednesday")).toEqual(true) // 3 people working
        expect(areWeCovered(r1, "Thursday")).toEqual(true) // 3 people working
        expect(areWeCovered(r1, "Friday")).toEqual(false) // 2 people working
        expect(areWeCovered(r1, "Saturday")).toEqual(false) // 0 people working
        expect(areWeCovered(r1, "Sunday")).toEqual(true) // 4 people working
        expect(areWeCovered(r1, "Fruitday")).toEqual(false) // aren't validating day names, should fail still
    })

    test("check function validates staff entries are formatted correctly", () => {
        const v1 = [
            { name: "John" },
            { name: "Jeff", rota: ["Thursday", "Friday", "Sunday"] }
        ]
        expect(() => {
            areWeCovered(v1, "Saturday")
        }).toThrow("staff require a rota array")

        const v2 = [
            { },
            { name: "Jeff", rota: ["Thursday", "Friday", "Sunday"] }
        ]
        expect(() => {
            areWeCovered(v2, "Saturday")
        }).toThrow("staff require a rota array")

        const v3 = []
        expect(areWeCovered(v3, "Saturday")).toBe(false)

        const v4 = [
            "test",
            { name: "Jeff", rota: ["Thursday", "Friday", "Sunday"] }
        ]
        expect(() => {
            areWeCovered(v4, "Saturday")
        }).toThrow("staff array contains invalid elements")
    })

    test("check function requires staff {Array} and day {String}", () => {
        expect(() => {
            areWeCovered()
        }).toThrow("staff is required")
        expect(() => {
            areWeCovered(["test"])
        }).toThrow("day is required")
        expect(() => {
            areWeCovered("ABC", "Test")
        }).toThrow("staff must be an Array")
        expect(() => {
            areWeCovered(["test"], 4)
        }).toThrow("day must be a String")
    })
})
