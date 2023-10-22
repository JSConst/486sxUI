import type { ImgListElem } from "types.imgLoader";

export const isImgLoaded = new Promise<ImgListElem[]>((resolve) => {
    fetch(
        `https://185.117.153.193.nip.io/proxy/?url=${encodeURIComponent(
            "http://486.sx/getList.php?list=list"
        )}`
    )
        .then((response) => {
            if (!response.ok) {
                return "Network error. Please try to attempt later.";
            }
            return response.text();
        })
        .then((data) => {
            const list = data.split("\r\n");
            const rslt = [];
            list.forEach((el) => {
                if (el.trim()) {
                    let tmp = el.split("+")[0].trim().split(".");
                    const id = tmp[0].trim();
                    tmp.shift();
                    const os = tmp.join(".").trim();
                    let programs = "Only OS with it's utilites";

                    if (el.split("+").length > 1) {
                        tmp = el.split("+");
                        tmp.shift();
                        programs = tmp.join("+");
                    }

                    if (rslt[os]) {
                        rslt[os].img.push({ id, programs });
                    } else {
                        rslt[os] = { os, img: [{ id, programs }] };
                    }
                }
            });
            const imgList = [];
            for (const key in rslt) {
                imgList.push(rslt[key]);
            }
            resolve(imgList);
        });
});
