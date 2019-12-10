# Storehouse
> React project with MDB to manage local machine files.

|TO DO            |DOING                         |DONE                        |
|----------------|-------------------------------|-----------------------------|
|`Encapsulate all ajax calls`|`Fixing API listFiles.php`|`Asynchronous forEach`|
|`Merge Functions.js component into API`||`API Create Folders`|
|`Apply basic styles`||`API Delete Files`|
|`Fix render in incomplete asynchronous response`|

### listFiles.php (building):
```php
$array = array();
define('PATH', '/home/user');
```
```mermaid
graph LR
A(scandir PATH result: 1, 2, 3) -- For each element --> B((1))
  B --> C(/home/user/1)
  C --> D{Is THIS contained by some element of $array?}
  D --> |Yes| [Finish!]
  D --> |No| E{is_dir AND not empty?}
  E --> |Yes| F($path=THIS)
  E --> |No| G(Push THIS into $array AND $path = PATH)
  F --> A
  G --> A
```
