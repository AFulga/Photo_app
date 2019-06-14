package com.fulga.pma.web;

import java.util.Base64;
import java.util.Date;

import com.fulga.pma.entity.Album;
import com.fulga.pma.entity.Photo;
import com.fulga.pma.entity.User;
import com.fulga.pma.repository.AlbumRepository;
import com.fulga.pma.repository.PhotoRepository;
import com.fulga.pma.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PmaController {

    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public void createUser(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser == null) {
            userRepository.save(user);
        }
    }

    @RequestMapping(value = "/albums", method = RequestMethod.GET)
    public Iterable<Album> getAllAlbums() {
        Iterable<Album> albums = albumRepository.findAll();
        return albums;
    }

    @RequestMapping(value = "/album/{id}", method = RequestMethod.GET)
    public Iterable<Album> getAllUserAlbums(@PathVariable Long id) {
        Iterable<Album> albums = albumRepository.findByUserId(id);
        return albums;
    }

    @RequestMapping(value = "/album", method = RequestMethod.POST)
    public Boolean createAlbum(@RequestBody Album album) {
        Iterable<Album> albums = albumRepository.findByName(album.getName());
        Album existingAlbum = null;
        for (Album albumX : albums) {
            if (albumX.getUserId() == album.getUserId()) {
                existingAlbum = albumX;
            }
        }

        if (existingAlbum == null) {
            album.setDate(new Date());
            albumRepository.save(album);
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/album/{id}", method = RequestMethod.DELETE)
    public void deleteAlbum(@PathVariable Long id) {
        Album existingAlbum = albumRepository.findById(id);
        if (existingAlbum != null) {
            albumRepository.delete(existingAlbum);
        }
    }

    @RequestMapping(value = "/photo", method = RequestMethod.POST)
    public boolean uploadPhoto(@RequestBody Photo photo) {
        Album album = albumRepository.findById(photo.getAlbum().getId());
        photo.setAlbum(album);
        photo.setUploadDate(new Date());
        photoRepository.save(photo);
        return true;
    }

    @RequestMapping(value = "/photo/{id}", method = RequestMethod.GET)
    public Iterable<Photo> getById(@PathVariable Long id) {
        Iterable<Photo> photos = photoRepository.findByAlbumId(id);
        for (Photo photo : photos) {
            // System.out.println("photo from h2:" + photo.getPhotoData());
        }
        return photos;
    }

    @RequestMapping(value = "/photo/photo={id}", method = RequestMethod.GET)
    public byte[] getPhotoById(@PathVariable Long id) {
        Photo photo = photoRepository.findOne(id);
        byte[] data = photo.getPhotoData();
        return data;
    }

    @RequestMapping(value = "/photo/{id}", method = RequestMethod.DELETE)
    public void deleteById(@PathVariable Long id) {
        Photo photo = photoRepository.findOne(id);
        System.out.println("photo from h2:" + photo.getId());
        photoRepository.delete(photo);
    }

}