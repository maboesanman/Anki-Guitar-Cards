export type Mark = SingleMark | BarreMark | MutedMark | OpenMark;

export interface SingleMark {
  type: 'single';
  string: number;
  fret: number;
  color?: string;
  label?: string;
}

export interface BarreMark {
  type: 'barre';
  startString: number;
  endString: number;
  fret: number;
  color?: string;
  label?: string;
}

export interface MutedMark {
  type: 'muted';
  string: number;
}

export interface OpenMark {
  type: 'open';
  string: number;
  color?: string;
}

export interface NeckMarkConfig {
  type: 'neck';
  marks: Mark[];
}

export interface ChordMarkConfig {
  type: 'chord';
  nut: boolean;
  marks: Mark[];
}

export interface ScaleMarkConfig {
  type: 'scale';
  marks: Mark[];
}

export type MarkConfig = NeckMarkConfig | ChordMarkConfig | ScaleMarkConfig;

export function parseConfig(input: string, hideLabels: boolean): MarkConfig | undefined {
  const words = input.split(" ").filter(x => x.length);
  let type: MarkConfig['type'] = 'chord';
  let nut = false;

  const first = words.shift()
  if(first === undefined) {
    return {
      type: 'chord',
      nut: false,
      marks: [],
    }
  }

  if(first.length !== 1) {
    words.unshift(first);
  } else {
    if(first === "O") {
      nut = true
    } else if(first === "N") {
      type = 'neck';
    } else if(first === "S") {
      type = 'scale';
    }
  }

  const marks: Mark[] = words.map((word) => {
    const [type, ...args] = word.split(",");

    switch (type) {
      case "B": // barre
        return (() => {
          const [strings, fret, label, color] = args;
          const [startString, endString] = strings.split("-")
          return {
            type: 'barre',
            startString: Number(startString),
            endString: Number(endString),
            fret: Number(fret),
            color,
            label,
          }
        })();
      case "M": // muted
        return (() => {
          const [string] = args;
          return {
            type: 'muted',
            string: Number(string),
          }
        })();
      case "O": // open
        return (() => {
          const [string, color] = args;
          return {
            type: 'open',
            string: Number(string),
            color,
          }
        })();
      case "S": // single
        return (() => {
          const [string, fret, label, color] = args;
          return {
            type: 'single',
            string: Number(string),
            fret: Number(fret),
            color,
            label,
          }
        })();

      default:
        args.unshift(type);
        return (() => {
          const [string, fret, label, color] = args;
          return {
            type: 'single',
            string: Number(string),
            fret: Number(fret),
            color,
            label,
          }
        })();
    }
  })

  if(hideLabels) {
    marks.forEach(mark => {
      switch (mark.type) {
        case 'barre':
        case 'single':
          delete mark.label;
          break;
        default:
          break;
      }
    })
  }

  if(type === 'chord') {
    return {
      type,
      nut,
      marks
    }
  } else {
    return {
      type,
      marks
    }
  }
}