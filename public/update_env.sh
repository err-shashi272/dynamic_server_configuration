#!/usr/bin/env bash

scp "$(pwd)/public/.configure_path"  $1@$2:/tmp
ssh $1@$2 bash << 'EOF'
while read -r var; do
    IFS="="; env=($var)
    key="${env[1]}"
    count=0
    if  [[ ${env[0]} == "ADD" ]]
    then
            echo export ${env[1]}"="${env[2]} >> $HOME/.env_aliases
    fi
    while read -r line; do
        ((count++))
        if  [[ "$line" == "export $key="* ]] && [[ ${env[0]} == "DELETE" ]]
        then
            sed -i.bkp $count'd' $HOME/.env_aliases
        fi

        if  [[ "$line" == "export $key="* ]] && [[ ${env[0]} == "UPDATE" ]]
        then
            sed -i.bkp $count'd' .env_aliases
            echo export ${env[1]}"="${env[2]} >> $HOME/.env_aliases
        fi
    done < "$HOME/.env_aliases"
 done < "/tmp/.configure_path"
 echo "SUCCESS UPDATE"
EOF