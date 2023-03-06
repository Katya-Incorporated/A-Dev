#!/usr/bin/env bash

unpack_image() {
    set -o errexit -o nounset -o pipefail

    ZIP_FILE=$1
    IMG_FILE=$2
    echo "$ZIP_FILE/$IMG_FILE"

    unzip $ZIP_FILE $IMG_FILE > /dev/null

    NAME=$(basename $IMG_FILE ".img")
    MNT="${NAME}_mnt"

    mkdir $MNT

    mount --read-only $IMG_FILE $MNT
    cp -a $MNT $NAME
    umount $MNT

    rm --dir $MNT
    rm $IMG_FILE
}

export -f unpack_image

unpack_factory_zip() {
    set -o errexit -o nounset -o pipefail

    cd "$(dirname "$(realpath $1)")"
    OUTER_ZIP_FILE="$(basename $1)"

    IMAGE_ZIP_PATH=$(zipinfo -l -1 $OUTER_ZIP_FILE "*/image-*")
    IMAGE_ZIP_DIR_NAME=$(dirname $IMAGE_ZIP_PATH)
    IMAGE_ZIP_FILE_NAME=$(basename $IMAGE_ZIP_PATH)

    echo "$IMAGE_ZIP_PATH"

    OUT_DIR="unpacked"
    [[ -d $OUT_DIR ]] || {
        mkdir $OUT_DIR
        chown $SUDO_UID:$SUDO_GID $OUT_DIR
    }

    unzip -d $OUT_DIR $OUTER_ZIP_FILE $IMAGE_ZIP_PATH > /dev/null

    cd "$OUT_DIR/$IMAGE_ZIP_DIR_NAME"

    zipinfo -l -1 $IMAGE_ZIP_FILE_NAME | grep -E '^(system|system_ext|product|vendor|odm).img$|dlkm.img$' | \
        parallel -u unpack_image $IMAGE_ZIP_FILE_NAME

    rm $IMAGE_ZIP_FILE_NAME
    chmod -R u+w .
    chown -R $SUDO_UID:$SUDO_GID .
}

export -f unpack_factory_zip

[[ -f $1 && $1 =~ .zip$ ]] || {
    echo "This script extracts and unpacks file system images from factory zip files."
    echo "Specify one or more factory zip file paths."
    exit 1
}

[[ $UID -eq 0 && -n $SUDO_UID && -n $SUDO_GID ]] || {
    echo "This script needs to be started through sudo to mount file system images and correctly set ownership of unpacked files."
    exit 1
}

parallel -u unpack_factory_zip ::: "$@"
