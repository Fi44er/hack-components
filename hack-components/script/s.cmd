@echo off

if "%~4"=="" (
    echo Usage: %0 ^<proto_path^> ^<output_file^> ^<filename^> ^<destination_folder^>
    exit /b 1
)

set "proto_path=%~1"
set "output_file=%~2"
set "filename=%~3"
set "destination_folder=%~4"

protoc --proto_path="%proto_path%" ^
    --plugin=protoc-gen-ts_proto=..\user-svc\node_modules\.bin\protoc-gen-ts_proto.cmd ^
    --ts_proto_out="%output_file%" ^
    --ts_proto_opt=nestJs=true "%filename%.proto"

copy "%proto_path%\%filename%.ts" "%destination_folder%"
copy "%proto_path%\%filename%.proto" "%destination_folder%"