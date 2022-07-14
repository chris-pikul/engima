export interface TraceStep {
  op:string;
  msg?:string;
  component?:string;

  input?:number;
  inputChar?:string;

  output?:number;
  outputChar?:string;
}

export interface Trace {
  inputRaw?:string;
  inputChar?:string;
  inputIndex?:number;

  steps:Array<TraceStep>;

  outputIndex?:number;
  outputChar?:string;
};
