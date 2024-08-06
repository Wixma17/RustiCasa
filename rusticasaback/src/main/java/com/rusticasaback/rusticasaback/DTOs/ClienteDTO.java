package com.rusticasaback.rusticasaback.DTOs;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDTO {
    private String gmail;
    private String nombre;
    private String apellido;
    private String passwd;
    private String nickname;
    private boolean administrador;
    private Date fechaNacimiento;
    private String imagen;

    public ClienteDTO(ClienteEntity clienteEntity) {
        gmail = clienteEntity.getGmail();
        nombre = clienteEntity.getNombre();
        apellido = clienteEntity.getApellido();
        passwd = clienteEntity.getPasswd();
        nickname = clienteEntity.getNickname();
        administrador = clienteEntity.isAdministrador();
        fechaNacimiento = clienteEntity.getFechaNacimiento();
    }

    public ClienteEntity createClienteEntity(){
        return new ClienteEntity(gmail, nombre, apellido, passwd, nickname, administrador, fechaNacimiento, null, null, null, null, null,null);
    }

    public static ClienteEntity createClienteEntity(ClienteDTO cli){
        return new ClienteEntity(cli.gmail, cli.nombre, cli.apellido, cli.passwd, cli.nickname, cli.administrador, cli.fechaNacimiento, null, null, null, null, null,null);
    }

    public static List<ClienteEntity> convertFromDtoList(List<ClienteDTO> listaDTO) {
        List<ClienteEntity> listaEntity = new ArrayList<>();
        listaDTO.forEach(al -> listaEntity.add(createClienteEntity(al)));
        return listaEntity;
    }

    public static List<ClienteDTO> convertFromEntityList(List<ClienteEntity> listaEntity) {
        List<ClienteDTO> listaDTO = new ArrayList<>();
        listaEntity.forEach(al -> listaDTO.add(new ClienteDTO(al)));
        return listaDTO;
    }

}
