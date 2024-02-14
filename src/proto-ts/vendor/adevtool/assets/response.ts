/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface Map {
  entry: { [key: string]: string };
}

export interface Map_EntryEntry {
  key: string;
  value: string;
}

export interface CarrierSettings {
  unknown: Uint8Array;
  cfg: CarrierSettings_Configs[];
  msg2: CarrierSettings_k | undefined;
  j: string;
}

export interface CarrierSettings_unk1 {
  n: Map | undefined;
}

export interface CarrierSettings_Configs {
  name: string;
  o: number;
  p: number;
  unk1: CarrierSettings_unk1 | undefined;
  ext: string;
  int: number;
}

export interface CarrierSettings_k {
  l: number;
  unk: Uint8Array;
}

export interface Field1 {
  entry: { [key: string]: number };
  settings: CarrierSettings | undefined;
  q: Map | undefined;
  s: string;
}

export interface Field1_EntryEntry {
  key: string;
  value: number;
}

export interface Response {
  field1: Field1 | undefined;
  field2: Uint8Array;
  field3: string;
  field4: number;
  field5: number;
}

function createBaseMap(): Map {
  return { entry: {} };
}

export const Map = {
  encode(message: Map, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.entry).forEach(([key, value]) => {
      Map_EntryEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Map {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = Map_EntryEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.entry[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Map {
    return {
      entry: isObject(object.entry)
        ? Object.entries(object.entry).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Map): unknown {
    const obj: any = {};
    if (message.entry) {
      const entries = Object.entries(message.entry);
      if (entries.length > 0) {
        obj.entry = {};
        entries.forEach(([k, v]) => {
          obj.entry[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Map>, I>>(base?: I): Map {
    return Map.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Map>, I>>(object: I): Map {
    const message = createBaseMap();
    message.entry = Object.entries(object.entry ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseMap_EntryEntry(): Map_EntryEntry {
  return { key: "", value: "" };
}

export const Map_EntryEntry = {
  encode(message: Map_EntryEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Map_EntryEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMap_EntryEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Map_EntryEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: Map_EntryEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Map_EntryEntry>, I>>(base?: I): Map_EntryEntry {
    return Map_EntryEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Map_EntryEntry>, I>>(object: I): Map_EntryEntry {
    const message = createBaseMap_EntryEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCarrierSettings(): CarrierSettings {
  return { unknown: new Uint8Array(0), cfg: [], msg2: undefined, j: "" };
}

export const CarrierSettings = {
  encode(message: CarrierSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.unknown.length !== 0) {
      writer.uint32(10).bytes(message.unknown);
    }
    for (const v of message.cfg) {
      CarrierSettings_Configs.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.msg2 !== undefined) {
      CarrierSettings_k.encode(message.msg2, writer.uint32(26).fork()).ldelim();
    }
    if (message.j !== "") {
      writer.uint32(34).string(message.j);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.unknown = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cfg.push(CarrierSettings_Configs.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.msg2 = CarrierSettings_k.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.j = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierSettings {
    return {
      unknown: isSet(object.unknown) ? bytesFromBase64(object.unknown) : new Uint8Array(0),
      cfg: Array.isArray(object?.cfg) ? object.cfg.map((e: any) => CarrierSettings_Configs.fromJSON(e)) : [],
      msg2: isSet(object.msg2) ? CarrierSettings_k.fromJSON(object.msg2) : undefined,
      j: isSet(object.j) ? String(object.j) : "",
    };
  },

  toJSON(message: CarrierSettings): unknown {
    const obj: any = {};
    if (message.unknown.length !== 0) {
      obj.unknown = base64FromBytes(message.unknown);
    }
    if (message.cfg?.length) {
      obj.cfg = message.cfg.map((e) => CarrierSettings_Configs.toJSON(e));
    }
    if (message.msg2 !== undefined) {
      obj.msg2 = CarrierSettings_k.toJSON(message.msg2);
    }
    if (message.j !== "") {
      obj.j = message.j;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierSettings>, I>>(base?: I): CarrierSettings {
    return CarrierSettings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierSettings>, I>>(object: I): CarrierSettings {
    const message = createBaseCarrierSettings();
    message.unknown = object.unknown ?? new Uint8Array(0);
    message.cfg = object.cfg?.map((e) => CarrierSettings_Configs.fromPartial(e)) || [];
    message.msg2 = (object.msg2 !== undefined && object.msg2 !== null)
      ? CarrierSettings_k.fromPartial(object.msg2)
      : undefined;
    message.j = object.j ?? "";
    return message;
  },
};

function createBaseCarrierSettings_unk1(): CarrierSettings_unk1 {
  return { n: undefined };
}

export const CarrierSettings_unk1 = {
  encode(message: CarrierSettings_unk1, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.n !== undefined) {
      Map.encode(message.n, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierSettings_unk1 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierSettings_unk1();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.n = Map.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierSettings_unk1 {
    return { n: isSet(object.n) ? Map.fromJSON(object.n) : undefined };
  },

  toJSON(message: CarrierSettings_unk1): unknown {
    const obj: any = {};
    if (message.n !== undefined) {
      obj.n = Map.toJSON(message.n);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierSettings_unk1>, I>>(base?: I): CarrierSettings_unk1 {
    return CarrierSettings_unk1.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierSettings_unk1>, I>>(object: I): CarrierSettings_unk1 {
    const message = createBaseCarrierSettings_unk1();
    message.n = (object.n !== undefined && object.n !== null) ? Map.fromPartial(object.n) : undefined;
    return message;
  },
};

function createBaseCarrierSettings_Configs(): CarrierSettings_Configs {
  return { name: "", o: 0, p: 0, unk1: undefined, ext: "", int: 0 };
}

export const CarrierSettings_Configs = {
  encode(message: CarrierSettings_Configs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.o !== 0) {
      writer.uint32(16).int32(message.o);
    }
    if (message.p !== 0) {
      writer.uint32(24).int32(message.p);
    }
    if (message.unk1 !== undefined) {
      CarrierSettings_unk1.encode(message.unk1, writer.uint32(50).fork()).ldelim();
    }
    if (message.ext !== "") {
      writer.uint32(42).string(message.ext);
    }
    if (message.int !== 0) {
      writer.uint32(72).int32(message.int);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierSettings_Configs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierSettings_Configs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.o = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.p = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.unk1 = CarrierSettings_unk1.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.ext = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.int = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierSettings_Configs {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      o: isSet(object.o) ? Number(object.o) : 0,
      p: isSet(object.p) ? Number(object.p) : 0,
      unk1: isSet(object.unk1) ? CarrierSettings_unk1.fromJSON(object.unk1) : undefined,
      ext: isSet(object.ext) ? String(object.ext) : "",
      int: isSet(object.int) ? Number(object.int) : 0,
    };
  },

  toJSON(message: CarrierSettings_Configs): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.o !== 0) {
      obj.o = Math.round(message.o);
    }
    if (message.p !== 0) {
      obj.p = Math.round(message.p);
    }
    if (message.unk1 !== undefined) {
      obj.unk1 = CarrierSettings_unk1.toJSON(message.unk1);
    }
    if (message.ext !== "") {
      obj.ext = message.ext;
    }
    if (message.int !== 0) {
      obj.int = Math.round(message.int);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierSettings_Configs>, I>>(base?: I): CarrierSettings_Configs {
    return CarrierSettings_Configs.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierSettings_Configs>, I>>(object: I): CarrierSettings_Configs {
    const message = createBaseCarrierSettings_Configs();
    message.name = object.name ?? "";
    message.o = object.o ?? 0;
    message.p = object.p ?? 0;
    message.unk1 = (object.unk1 !== undefined && object.unk1 !== null)
      ? CarrierSettings_unk1.fromPartial(object.unk1)
      : undefined;
    message.ext = object.ext ?? "";
    message.int = object.int ?? 0;
    return message;
  },
};

function createBaseCarrierSettings_k(): CarrierSettings_k {
  return { l: 0, unk: new Uint8Array(0) };
}

export const CarrierSettings_k = {
  encode(message: CarrierSettings_k, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.l !== 0) {
      writer.uint32(8).int32(message.l);
    }
    if (message.unk.length !== 0) {
      writer.uint32(18).bytes(message.unk);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierSettings_k {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierSettings_k();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.l = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.unk = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierSettings_k {
    return {
      l: isSet(object.l) ? Number(object.l) : 0,
      unk: isSet(object.unk) ? bytesFromBase64(object.unk) : new Uint8Array(0),
    };
  },

  toJSON(message: CarrierSettings_k): unknown {
    const obj: any = {};
    if (message.l !== 0) {
      obj.l = Math.round(message.l);
    }
    if (message.unk.length !== 0) {
      obj.unk = base64FromBytes(message.unk);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierSettings_k>, I>>(base?: I): CarrierSettings_k {
    return CarrierSettings_k.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierSettings_k>, I>>(object: I): CarrierSettings_k {
    const message = createBaseCarrierSettings_k();
    message.l = object.l ?? 0;
    message.unk = object.unk ?? new Uint8Array(0);
    return message;
  },
};

function createBaseField1(): Field1 {
  return { entry: {}, settings: undefined, q: undefined, s: "" };
}

export const Field1 = {
  encode(message: Field1, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.entry).forEach(([key, value]) => {
      Field1_EntryEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    if (message.settings !== undefined) {
      CarrierSettings.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    if (message.q !== undefined) {
      Map.encode(message.q, writer.uint32(26).fork()).ldelim();
    }
    if (message.s !== "") {
      writer.uint32(34).string(message.s);
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
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = Field1_EntryEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.entry[entry1.key] = entry1.value;
          }
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.settings = CarrierSettings.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.q = Map.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.s = reader.string();
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
    return {
      entry: isObject(object.entry)
        ? Object.entries(object.entry).reduce<{ [key: string]: number }>((acc, [key, value]) => {
          acc[key] = Number(value);
          return acc;
        }, {})
        : {},
      settings: isSet(object.settings) ? CarrierSettings.fromJSON(object.settings) : undefined,
      q: isSet(object.q) ? Map.fromJSON(object.q) : undefined,
      s: isSet(object.s) ? String(object.s) : "",
    };
  },

  toJSON(message: Field1): unknown {
    const obj: any = {};
    if (message.entry) {
      const entries = Object.entries(message.entry);
      if (entries.length > 0) {
        obj.entry = {};
        entries.forEach(([k, v]) => {
          obj.entry[k] = Math.round(v);
        });
      }
    }
    if (message.settings !== undefined) {
      obj.settings = CarrierSettings.toJSON(message.settings);
    }
    if (message.q !== undefined) {
      obj.q = Map.toJSON(message.q);
    }
    if (message.s !== "") {
      obj.s = message.s;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Field1>, I>>(base?: I): Field1 {
    return Field1.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Field1>, I>>(object: I): Field1 {
    const message = createBaseField1();
    message.entry = Object.entries(object.entry ?? {}).reduce<{ [key: string]: number }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Number(value);
      }
      return acc;
    }, {});
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? CarrierSettings.fromPartial(object.settings)
      : undefined;
    message.q = (object.q !== undefined && object.q !== null) ? Map.fromPartial(object.q) : undefined;
    message.s = object.s ?? "";
    return message;
  },
};

function createBaseField1_EntryEntry(): Field1_EntryEntry {
  return { key: "", value: 0 };
}

export const Field1_EntryEntry = {
  encode(message: Field1_EntryEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Field1_EntryEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseField1_EntryEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Field1_EntryEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: Field1_EntryEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Field1_EntryEntry>, I>>(base?: I): Field1_EntryEntry {
    return Field1_EntryEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Field1_EntryEntry>, I>>(object: I): Field1_EntryEntry {
    const message = createBaseField1_EntryEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseResponse(): Response {
  return { field1: undefined, field2: new Uint8Array(0), field3: "", field4: 0, field5: 0 };
}

export const Response = {
  encode(message: Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field1 !== undefined) {
      Field1.encode(message.field1, writer.uint32(10).fork()).ldelim();
    }
    if (message.field2.length !== 0) {
      writer.uint32(18).bytes(message.field2);
    }
    if (message.field3 !== "") {
      writer.uint32(26).string(message.field3);
    }
    if (message.field4 !== 0) {
      writer.uint32(32).int32(message.field4);
    }
    if (message.field5 !== 0) {
      writer.uint32(40).int32(message.field5);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
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

          message.field2 = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.field3 = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.field4 = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.field5 = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Response {
    return {
      field1: isSet(object.field1) ? Field1.fromJSON(object.field1) : undefined,
      field2: isSet(object.field2) ? bytesFromBase64(object.field2) : new Uint8Array(0),
      field3: isSet(object.field3) ? String(object.field3) : "",
      field4: isSet(object.field4) ? Number(object.field4) : 0,
      field5: isSet(object.field5) ? Number(object.field5) : 0,
    };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    if (message.field1 !== undefined) {
      obj.field1 = Field1.toJSON(message.field1);
    }
    if (message.field2.length !== 0) {
      obj.field2 = base64FromBytes(message.field2);
    }
    if (message.field3 !== "") {
      obj.field3 = message.field3;
    }
    if (message.field4 !== 0) {
      obj.field4 = Math.round(message.field4);
    }
    if (message.field5 !== 0) {
      obj.field5 = Math.round(message.field5);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Response>, I>>(base?: I): Response {
    return Response.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Response>, I>>(object: I): Response {
    const message = createBaseResponse();
    message.field1 = (object.field1 !== undefined && object.field1 !== null)
      ? Field1.fromPartial(object.field1)
      : undefined;
    message.field2 = object.field2 ?? new Uint8Array(0);
    message.field3 = object.field3 ?? "";
    message.field4 = object.field4 ?? 0;
    message.field5 = object.field5 ?? 0;
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
