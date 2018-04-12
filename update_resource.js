// 自动生成resource.js的资源绑定代码 for cocos2d-js
// 用到的walker和line-reader通过npm install xxx去安装

var fs = require('fs');
var walker = require('walker');
var lineReader = require('line-reader');

// 写入文件
var writeToFile = function(content) {
    var dstFile = "./src/resource.js";
    var beforeContent = "", afterContent = "";
    var before = false, after = false;
    lineReader.eachLine(dstFile, function(line, last) {
        if(!before) {
            if(beforeContent !== "") {
                beforeContent += "\n";
            }
            beforeContent += line;
            if(line.match("var res = {")) {
                before = true;
            }
        }
        if(before && !after) {
            if(line.match("}")) {
                after = true;
            };
        }
        if(after) {
            if(afterContent !== "") {
                afterContent += "\n";
            }
            afterContent += line;
        }
        if(last) {
            content = beforeContent + "\n" + content + "\n" + afterContent;
            fs.writeFile(dstFile, content);
        }
    });
};

// 生成列表
var generateFile = function() {
    var content = "";
    walker("./res")
        .on('file', function(file, stat) {
            // 过滤掉无用的文件
            if(!file.match(".DS_Store") && !file.match("thumbs.db")) {
                var key = file.replace('res/', '').replace('.', '_').replace('/', '_');
                if(content !== "") {
                    content += ',\n';
                }
                content += "    ";
                content += key;
                content += " : \"" + file + "\"";
            }
        })
        .on('end', function() {
            // content += "};"
            writeToFile(content);
            console.log("content" + content);
        });
    ;
}

generateFile();