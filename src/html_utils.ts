namespace html_utils {
    export function getElementById(element, idToFind): void {
        const descendants = element.getDescendants();
        for (let i in descendants) {
            const elt = descendants[i].asElement();
            if (elt != null) {
                const id = elt.getAttribute('id');
                if (id != null && id.getValue() == idToFind)
                    return elt;
            }
        }
    }

    export function getElementsByClassName(element, classToFind): any[] {
        let data: Element[] = [];
        let descendants = element.getDescendants();
        descendants.push(element);

        for (let i in descendants) {
            const elt = descendants[i].asElement();
            if (elt != null) {
                let classes = elt.getAttribute('class');
                if (classes != null) {
                    classes = classes.getValue();
                    if (classes == classToFind)
                        data.push(elt);
                    else {
                        classes = classes.split(' ');
                        for (let j in classes) {
                            if (classes[j] == classToFind) {
                                data.push(elt);
                                break;
                            }
                        }
                    }
                }
            }
        }

        return data;
    }

    export function getElementsByTagName(element, tagName): any[] {
        let data: Element[] = [];
        let descendants = element.getDescendants();

        for (let i in descendants) {
            const elt = descendants[i].asElement();
            if (elt != null && elt.getName() == tagName) {
                data.push(elt);
            }
        }

        return data;
    }
}
