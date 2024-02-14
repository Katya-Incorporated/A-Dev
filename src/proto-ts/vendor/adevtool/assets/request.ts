/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface Field1 {
  info: Field1_devinfo | undefined;
}

export interface Field1_devinfo {
  int: number;
  deviceInfo: Field1_devinfo_info | undefined;
}

export interface Field1_devinfo_info {
  apilevel: number;
  name: string;
  buildId: string;
  name1: string;
  name2: string;
  locale1: string;
  locale2: string;
  manufacturer1: string;
  manufacturer2: string;
  name3: string;
}

export interface Field2 {
  info: Field2_appinfo | undefined;
}

export interface Field2_appinfo {
  pkgname: string;
}

export interface Request {
  field1: Field1 | undefined;
  field2: Field2 | undefined;
}

function createBaseField1(): Field1 {
  return { info: undefined };
}

export const Field1 = {
  encode(message: Field1, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.info !== undefined) {
      Field1_devinfo.encode(message.info, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Field1 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseField1();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = Field1_devinfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Field1 {
    return { info: isSet(object.info) ? Field1_devinfo.fromJSON(object.info) : undefined };
  },

  toJSON(message: Field1): unknown {
    const obj: any = {};
    if (message.info !== undefined) {
      obj.info = Field1_devinfo.toJSON(message.info);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Field1>, I>>(base?: I): Field1 {
    return Field1.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Field1>, I>>(object: I): Field1 {
    const message = createBaseField1();
    message.info = (object.info !== undefined && object.info !== null)
      ? Field1_devinfo.fromPartial(object.info)
      : undefined;
    return message;
  },
};

function createBaseField1_devinfo(): Field1_devinfo {
  return { int: 0, deviceInfo: undefined };
}

export const Field1_devinfo = {
  encode(message: Field1_devinfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.int !== 0) {
      writer.uint32(8).int32(message.int);
    }
    if (message.deviceInfo !== undefined) {
      Field1_devinfo_info.encode(message.deviceInfo, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Field1_devinfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseField1_devinfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.int = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deviceInfo = Field1_devinfo_info.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Field1_devinfo {
    return {
      int: isSet(object.int) ? Number(object.int) : 0,
      deviceInfo: isSet(object.deviceInfo) ? Field1_devinfo_info.fromJSON(object.deviceInfo) : undefined,
    };
  },

  toJSON(message: Field1_devinfo): unknown {
    const obj: any = {};
    if (message.int !== 0) {
      obj.int = Math.round(message.int);
    }
    if (message.deviceInfo !== undefined) {
      obj.deviceInfo = Field1_devinfo_info.toJSON(message.deviceInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Field1_devinfo>, I>>(base?: I): Field1_devinfo {
    return Field1_devinfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Field1_devinfo>, I>>(object: I): Field1_devinfo {
    const message = createBaseField1_devinfo();
    message.int = object.int ?? 0;
    message.deviceInfo = (object.deviceInfo !== undefined && object.deviceInfo !== null)
      ? Field1_devinfo_info.fromPartial(object.deviceInfo)
      : undefined;
    return message;
  },
};

function createBaseField1_devinfo_info(): Field1_devinfo_info {
  return {
    apilevel: 0,
    name: "",
    buildId: "",
    name1: "",
    name2: "",
    locale1: "",
    locale2: "",
    manufacturer1: "",
    manufacturer2: "",
    name3: "",
  };
}

export const Field1_devinfo_info = {
  encode(message: Field1_devinfo_info, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apilevel !== 0) {
      writer.uint32(24).int32(message.apilevel);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    if (message.buildId !== "") {
      writer.uint32(50).string(message.buildId);
    }
    if (message.name1 !== "") {
      writer.uint32(66).string(message.name1);
    }
    if (message.name2 !== "") {
      writer.uint32(74).string(message.name2);
    }
    if (message.locale1 !== "") {
      writer.uint32(90).string(message.locale1);
    }
    if (message.locale2 !== "") {
      writer.uint32(98).string(message.locale2);
    }
    if (message.manufacturer1 !== "") {
      writer.uint32(106).string(message.manufacturer1);
    }
    if (message.manufacturer2 !== "") {
      writer.uint32(114).string(message.manufacturer2);
    }
    if (message.name3 !== "") {
      writer.uint32(122).string(message.name3);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Field1_devinfo_info {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseField1_devinfo_info();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 24) {
            break;
          }

          message.apilevel = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.name = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.buildId = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.name1 = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.name2 = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.locale1 = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.locale2 = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.manufacturer1 = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.manufacturer2 = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.name3 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Field1_devinfo_info {
    return {
      apilevel: isSet(object.apilevel) ? Number(object.apilevel) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      buildId: isSet(object.buildId) ? String(object.buildId) : "",
      name1: isSet(object.name1) ? String(object.name1) : "",
      name2: isSet(object.name2) ? String(object.name2) : "",
      locale1: isSet(object.locale1) ? String(object.locale1) : "",
      locale2: isSet(object.locale2) ? String(object.locale2) : "",
      manufacturer1: isSet(object.manufacturer1) ? String(object.manufacturer1) : "",
      manufacturer2: isSet(object.manufacturer2) ? String(object.manufacturer2) : "",
      name3: isSet(object.name3) ? String(object.name3) : "",
    };
  },

  toJSON(message: Field1_devinfo_info): unknown {
    const obj: any = {};
    if (message.apilevel !== 0) {
      obj.apilevel = Math.round(message.apilevel);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.buildId !== "") {
      obj.buildId = message.buildId;
    }
    if (message.name1 !== "") {
      obj.name1 = message.name1;
    }
    if (message.name2 !== "") {
      obj.name2 = message.name2;
    }
    if (message.locale1 !== "") {
      obj.locale1 = message.locale1;
    }
    if (message.locale2 !== "") {
      obj.locale2 = message.locale2;
    }
    if (message.manufacturer1 !== "") {
      obj.manufacturer1 = message.manufacturer1;
    }
    if (message.manufacturer2 !== "") {
      obj.manufacturer2 = message.manufacturer2;
    }
    if (message.name3 !== "") {
      obj.name3 = message.name3;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Field1_devinfo_info>, I>>(base?: I): Field1_devinfo_info {
    return Field1_devinfo_info.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Field1_devinfo_info>, I>>(object: I): Field1_devinfo_info {
    const message = createBaseField1_devinfo_info();
    message.apilevel = object.apilevel ?? 0;
    message.name = object.name ?? "";
    message.buildId = object.buildId ?? "";
    message.name1 = object.name1 ?? "";
    message.name2 = object.name2 ?? "";
    message.locale1 = object.locale1 ?? "";
    message.locale2 = object.locale2 ?? "";
    message.manufacturer1 = object.manufacturer1 ?? "";
    message.manufacturer2 = object.manufacturer2 ?? "";
    message.name3 = object.name3 ?? "";
    return message;
  },
};

function createBaseField2(): Field2 {
  return { info: undefined };
}

export const Field2 = {
  encode(message: Field2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.info !== undefined) {
      Field2_appinfo.encode(message.info, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Field2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseField2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.info = Field2_appinfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Field2 {
    return { info: isSet(object.info) ? Field2_appinfo.fromJSON(object.info) : undefined };
  },

  toJSON(message: Field2): unknown {
    const obj: any = {};
    if (message.info !== undefined) {
      obj.info = Field2_appinfo.toJSON(message.info);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Field2>, I>>(base?: I): Field2 {
    return Field2.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Field2>, I>>(object: I): Field2 {
    const message = createBaseField2();
    message.info = (object.info !== undefined && object.info !== null)
      ? Field2_appinfo.fromPartial(object.info)
      : undefined;
    return message;
  },
};

function createBaseField2_appinfo(): Field2_appinfo {
  return { pkgname: "" };
}

export const Field2_appinfo = {
  encode(message: Field2_appinfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pkgname !== "") {
      writer.uint32(10).string(message.pkgname);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Field2_appinfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseField2_appinfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pkgname = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Field2_appinfo {
    return { pkgname: isSet(object.pkgname) ? String(object.pkgname) : "" };
  },

  toJSON(message: Field2_appinfo): unknown {
    const obj: any = {};
    if (message.pkgname !== "") {
      obj.pkgname = message.pkgname;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Field2_appinfo>, I>>(base?: I): Field2_appinfo {
    return Field2_appinfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Field2_appinfo>, I>>(object: I): Field2_appinfo {
    const message = createBaseField2_appinfo();
    message.pkgname = object.pkgname ?? "";
    return message;
  },
};

function createBaseRequest(): Request {
  return { field1: undefined, field2: undefined };
}

export const Request = {
  encode(message: Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field1 !== undefined) {
      Field1.encode(message.field1, writer.uint32(10).fork()).ldelim();
    }
    if (message.field2 !== undefined) {
      Field2.encode(message.field2, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field1 = Field1.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.field2 = Field2.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Request {
    return {
      field1: isSet(object.field1) ? Field1.fromJSON(object.field1) : undefined,
      field2: isSet(object.field2) ? Field2.fromJSON(object.field2) : undefined,
    };
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    if (message.field1 !== undefined) {
      obj.field1 = Field1.toJSON(message.field1);
    }
    if (message.field2 !== undefined) {
      obj.field2 = Field2.toJSON(message.field2);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Request>, I>>(base?: I): Request {
    return Request.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Request>, I>>(object: I): Request {
    const message = createBaseRequest();
    message.field1 = (object.field1 !== undefined && object.field1 !== null)
      ? Field1.fromPartial(object.field1)
      : undefined;
    message.field2 = (object.field2 !== undefined && object.field2 !== null)
      ? Field2.fromPartial(object.field2)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
