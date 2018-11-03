/*
 * @Author: AK-12 
 * @Date: 2018-11-02 17:06:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 13:11:37
 */
import IMathVec from './IMathVec'

export default class MathVec implements IMathVec {
  /**
   *Creates an instance of MathVec.
   * @param {number} start 初值
   * @param {number} step 步长
   * @param {number} num 最大次数
   * @example let rand = new MathVec(-150, 100, 4)
   * @memberof MathVec
   */
  constructor(start: number, step: number, num: number) {
    this.start = start
    this.step = step
    this.num = num
  }
  private start: number
  private step: number
  private num: number
  public randPos(): cc.Vec2 {
    let rand =
      this.start + parseInt(String(Math.random() * this.num)) * this.step
    return cc.v2(rand, rand)
  }
  public randVaule(): number {
    return this.start + parseInt(String(Math.random() * this.num * this.step))
  }
  /**
   *cc.Vec2的基础运算
   *
   * @param {cc.Vec2} v1
   * @param {string} method
   * @param {cc.Vec2} v2
   * @returns {cc.Vec2}
   * @example computed(cc.v2(0, 0), '+', cc.v2(1, 1))
   * @memberof MathVec
   */
  public computed(v1: cc.Vec2, method: string, v2: cc.Vec2): cc.Vec2 {
    let result
    switch (method) {
      case '+':
        result = cc.v2(v1.x + v2.x, v1.y + v2.y)
        break
      case '-':
        result = cc.v2(v1.x - v2.x, v1.y - v2.y)
        break
      case '*':
        result = cc.v2(v1.x * v2.x, v1.y * v2.y)
        break
      case '/':
        result = cc.v2(v1.x / v2.x, v1.y / v2.y)
        break

      default:
        throw new Error('computed method unknown')
    }
    return result
  }
}
/**
 *矩阵行列互换
 *
 * @export
 * @template Type
 * @param {Type[][]} arr
 * @returns {Type[][]}
 */
export function transformArray<Type>(arr: Type[][]): Type[][] {
  let newArray: Array<Array<Type>> = new Array<Array<Type>>()
  let raws = arr.length
  let raw = 0
  for (; raw < raws; raw++) {
    newArray.push([])
    let col = 0
    let cols = arr[raw].length
    for (; col < cols; col++) {
      newArray[raw][col] = arr[col][raw]
    }
  }
  return newArray
}
/**
 *遍历二维数组元素
 *
 * @export
 * @template Type
 * @param {Type[][]} arr
 * @param {(raw: number, col: number) => void} callback
 */
export function visitArray<Type>(
  arr: Type[][],
  callback: (raw: number, col: number) => void
) {
  let raws = arr.length
  let raw = 0
  for (; raw < raws; raw++) {
    let cols = arr[raw].length
    let col = 0
    for (; col < cols; col++) {
      callback(raw, col)
    }
  }
}
/**
 *随机访问二维数组元素
 *
 * @export
 * @template Type
 * @param {Type[][]} arr
 * @param {(raw: number, col: number) => void} callback
 */
export function visitArrayRand<Type>(
  arr: Type[][],
  callback: (raw: number, col: number) => void
) {
  let randRow = toInt(Math.random() * arr.length)
  let randCol = toInt(Math.random() * arr[randRow].length)
  callback(randRow, randCol)
}
/**
 *转为整型
 *
 * @export
 * @param {*} value
 * @returns
 */
export function toInt(value) {
  return parseInt(String(value))
}
/**
 *随机概率执行函数
 *
 * @export
 * @param {Function} callback
 * @param {number} [value=2]
 */
export function randFunc(callback: Function, value: number = 2): void {
  let rand = Boolean(toInt(Math.random() * value))
  if (rand) {
    callback(rand)
  }
}
/**
 *替换二维数组指定位置的值
 *
 * @export
 * @template Type
 * @param {Type[][]} arr
 * @param
 *   { raw: number
 *     col: number
 *   } pos
 * @param {*} value
 */
export function alterArray<Type>(
  arr: Type[][],
  pos: {
    raw: number
    col: number
  },
  value: any
) {
  arr[pos.raw].splice(pos.col, 1, value)
}