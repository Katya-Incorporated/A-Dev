/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "com.google.carrier";

/**
 * Copyright (C) 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** The carrier ID is matched against SIM data to determine carrier */
export interface CarrierId {
  /** Mobile Country Code (MCC) & Mobile Network Code (MNC) */
  mccMnc: string;
  /** SPN (Service Provider Name) */
  spn?:
    | string
    | undefined;
  /** IMSI prefix pattern */
  imsi?:
    | string
    | undefined;
  /** Group identifier (level 1) prefix */
  gid1?: string | undefined;
}

/** Maps CarrierIds to an internal unique carrier name */
export interface CarrierMap {
  /**
   * A unique canonical carrier name
   * This name is the primary key to identify a carrier
   * Typically a canonical_name looks like <carrier_name>_<iso_country_code>
   */
  canonicalName: string;
  /** A collection of network IDs owned by this carrier */
  carrierId: CarrierId[];
}

/** Maps CarrierId to internal unique carrier name */
export interface CarrierList {
  /** A collection of carrier maps; one entry for one carrier */
  entry: CarrierMap[];
  /** The version number of this CarrierList file */
  version: number;
}

function createBaseCarrierId(): CarrierId {
  return { mccMnc: "", spn: undefined, imsi: undefined, gid1: undefined };
}

export const CarrierId = {
  encode(message: CarrierId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mccMnc !== "") {
      writer.uint32(10).string(message.mccMnc);
    }
    if (message.spn !== undefined) {
      writer.uint32(18).string(message.spn);
    }
    if (message.imsi !== undefined) {
      writer.uint32(26).string(message.imsi);
    }
    if (message.gid1 !== undefined) {
      writer.uint32(34).string(message.gid1);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierId {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.mccMnc = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.spn = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.imsi = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.gid1 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierId {
    return {
      mccMnc: isSet(object.mccMnc) ? String(object.mccMnc) : "",
      spn: isSet(object.spn) ? String(object.spn) : undefined,
      imsi: isSet(object.imsi) ? String(object.imsi) : undefined,
      gid1: isSet(object.gid1) ? String(object.gid1) : undefined,
    };
  },

  toJSON(message: CarrierId): unknown {
    const obj: any = {};
    if (message.mccMnc !== "") {
      obj.mccMnc = message.mccMnc;
    }
    if (message.spn !== undefined) {
      obj.spn = message.spn;
    }
    if (message.imsi !== undefined) {
      obj.imsi = message.imsi;
    }
    if (message.gid1 !== undefined) {
      obj.gid1 = message.gid1;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierId>, I>>(base?: I): CarrierId {
    return CarrierId.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierId>, I>>(object: I): CarrierId {
    const message = createBaseCarrierId();
    message.mccMnc = object.mccMnc ?? "";
    message.spn = object.spn ?? undefined;
    message.imsi = object.imsi ?? undefined;
    message.gid1 = object.gid1 ?? undefined;
    return message;
  },
};

function createBaseCarrierMap(): CarrierMap {
  return { canonicalName: "", carrierId: [] };
}

export const CarrierMap = {
  encode(message: CarrierMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.canonicalName !== "") {
      writer.uint32(10).string(message.canonicalName);
    }
    for (const v of message.carrierId) {
      CarrierId.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierMap {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.canonicalName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.carrierId.push(CarrierId.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierMap {
    return {
      canonicalName: isSet(object.canonicalName) ? String(object.canonicalName) : "",
      carrierId: Array.isArray(object?.carrierId) ? object.carrierId.map((e: any) => CarrierId.fromJSON(e)) : [],
    };
  },

  toJSON(message: CarrierMap): unknown {
    const obj: any = {};
    if (message.canonicalName !== "") {
      obj.canonicalName = message.canonicalName;
    }
    if (message.carrierId?.length) {
      obj.carrierId = message.carrierId.map((e) => CarrierId.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierMap>, I>>(base?: I): CarrierMap {
    return CarrierMap.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierMap>, I>>(object: I): CarrierMap {
    const message = createBaseCarrierMap();
    message.canonicalName = object.canonicalName ?? "";
    message.carrierId = object.carrierId?.map((e) => CarrierId.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCarrierList(): CarrierList {
  return { entry: [], version: 0 };
}

export const CarrierList = {
  encode(message: CarrierList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.entry) {
      CarrierMap.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.version !== 0) {
      writer.uint32(16).int64(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entry.push(CarrierMap.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.version = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierList {
    return {
      entry: Array.isArray(object?.entry) ? object.entry.map((e: any) => CarrierMap.fromJSON(e)) : [],
      version: isSet(object.version) ? Number(object.version) : 0,
    };
  },

  toJSON(message: CarrierList): unknown {
    const obj: any = {};
    if (message.entry?.length) {
      obj.entry = message.entry.map((e) => CarrierMap.toJSON(e));
    }
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierList>, I>>(base?: I): CarrierList {
    return CarrierList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierList>, I>>(object: I): CarrierList {
    const message = createBaseCarrierList();
    message.entry = object.entry?.map((e) => CarrierMap.fromPartial(e)) || [];
    message.version = object.version ?? 0;
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

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
