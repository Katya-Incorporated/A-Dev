## Initial setup 

After downloading GrapheneOS source, run:
```bash
yarn install --cwd vendor/adevtool
source script/envsetup.sh
m aapt2
```

## Vendor module generation

To (re)generate vendor module in `vendor/$VENDOR/$DEVICE`, run
```bash
adevtool generate-all -d $DEVICE
```
Stock OS factory and OTA device images will be downloaded automatically if they are missing.

`-d` flag accepts references to one or more Device or DeviceList configs, e.g. `-d pixel-gen{5,6} panther`.
Its default value is `config/device/all.yml` DeviceList.

Generated vendor module will be verified against the specification of the reference module (basically a list of file hashes)
in `vendor-specs/$VENDOR/$DEVICE.yml`.

It's recommended to always run `adevtool generate-all` after making changes to adevtool to make sure that generated 
vendor modules remain exactly the same for all devices.

## Updating configs after release of new stock OS version

- After stock OS images are published, update index of known builds and their corresponding images by running
```bash
adevtool update-build-index
```

This will update the `config/build-index/build-index-main.yml` file and show its git diff.

- Pick build ID for each of supported devices and update `build_id` values in device configs and/or device config fragments 
in `config/device/` YAML files. Build ID can be applied to multiple devices via `config/device/common` device config fragments,
e.g. `pixel.yml` applies to all Pixel devices, `gen6pixel.yml` applies to all 6th gen Pixel devices and overrides values
from `pixel.yml` etc. Values from `config/device/$DEVICE.yml` device configs override values from device config fragments.

To verify that build IDs are set correctly, check the output of `adevtool show-status` command.

- Download stock OS images:
```bash
adevtool download [-d DEVICE(s)] -t factory ota
```
This step can be skipped, images will be downloaded on-demand automatically by most commands that need them.

- Once AOSP tags are pushed, run  
```bash
adevtool update-aosp-tag-index
```

to update `config/build-index/build-id-to-tag.yml` file which maps build IDs to their AOSP tags and show its
git diff.

build-id-to-tag index is currently used only by the `adevtool show-status` command.

- Make a state collection OS build and use it to update `vendor/state/$DEVICE.json`.
This step can usually be skipped for security-patch-only (non-QPR) stock OS updates.
```bash 
# generate a special vendor module for state collection build
adevtool generate-prep -d $DEVICE
export OFFICIAL_BUILD=true
# build type should be `user`, not `userdebug` or `eng`
lunch $DEVICE-user
m 
# serialize several parts of build system state from out/ to vendor/state/$DEVICE.json
adevtool collect-state -d $DEVICE

# Reuse of out/ dir between state collection and regular build may lead to bad builds.
# However, out/ dir can be reused between state collection builds as of Android 13 QPR3
rm -r out

cd vendor/state
# commit changes to $DEVICE.json and publish them
```

- Generate a new reference vendor module
```bash 
adevtool generate-all -d $DEVICE --updateSpec
```

`--updateSpec` flag tells adevtool to update list of vendor module file hashes in `vendor-specs/$VENDOR/$DEVICE.yml` 
and copy generated text files from the vendor module to `vendor-skels/$VENDOR/$DEVICE.yml`. 

Contents of `vendor-skels/` do not affect vendor module generation, they are used for recording vendor module changes to 
git history. 

Review the changes to `vendor-skels/` and `vendor-specs/` with git diff. If there are new files/overlays/etc that need
to be removed, update filters in device configs and/or device config fragments and run `generate-all` with `--updateSpec`
flag again.

- Commit changes in adevtool repo and publish them 
